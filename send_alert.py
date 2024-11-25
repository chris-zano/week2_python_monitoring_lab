import json
import os
import subprocess


def send_alert(subject, message):
    """
    Sends a system alert email with the given subject and message.

    This function writes the alert details (subject and message) to a JSON file
    (`system_alert_email.json`) and invokes a Node.js script (`mailer.js`) to send
    the email. The Node.js script handles email delivery using the sender credentials
    configured via environment variables.

    Args:
        subject (str): The subject of the alert email.
        message (str): The message body of the alert email.

    Process:
        1. Creates or overwrites `system_alert_email.json` with the alert details.
        2. Executes the `mailer.js` Node.js script using the `subprocess` module.
        3. Captures and logs the output or errors from the Node.js script.

    Exceptions:
        Catches and logs any exceptions that occur during the email sending process,
        including issues with the Node.js script execution.

    Example:
        send_alert("High CPU Usage", "CPU usage is at 90%, exceeding the threshold.")
    """
    
    data = {"subject": subject, "message": message}
    with open("system_alert_email.json", "w") as fw:
        json.dump(data, fw)

    try:
        file_path = os.path.join(os.getcwd(), "node", "mailer.js")
        output = subprocess.run(
            ["node", file_path],
            capture_output=True,
            text=True,
        )

        if output.stdout:
            print("Email sent successfully")
        elif output.stderr:
            print(output.stderr)

    except Exception as e:
        print(f"Error occured while sending the alert! -> {e}")
