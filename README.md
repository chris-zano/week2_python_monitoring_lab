# System Monitoring and Alerting Tool

This project is a system monitoring tool designed to track system resource usage and send alert emails when resource thresholds are exceeded. It uses a combination of Python and Node.js scripts for system monitoring and email alerting. The project originally intended to use Mailjet for email delivery but has been updated to use **Nodemailer**, as Mailjet could not be configured successfully.

---

## Features

- **System Resource Monitoring:** Tracks CPU usage, RAM usage, and available disk space using Python's `psutil` library.
- **Alert Generation:** Generates alert messages if resource usage exceeds specified thresholds.
- **Email Notification:** Sends alert emails to a designated recipient using a Python script (`monitor.py`) and a Node.js script (`mailer.js`) for email delivery via Gmail.
- **Configurable Thresholds:** Users can set thresholds for CPU, RAM, and disk usage in the monitoring script.

---

## Project Components

### 1. **Python Monitoring Script (`monitor.py`)**
   - Monitors system metrics:
     - CPU usage
     - RAM usage
     - Disk space
   - Compares metrics against pre-configured thresholds.
   - If any threshold is exceeded, it generates an alert message and calls the `send_alert` function to send an email notification.

### 2. **Python Alert Sender (`send_alert`)**
   - Writes the alert's subject and message to a JSON file (`system_alert_email.json`).
   - Executes the `mailer.js` script using the `subprocess` module.
   - Captures and logs the success or failure of the email-sending process.

### 3. **Node.js Email Sender (`mailer.js`)**
   - Reads the alert details from `system_alert_email.json`.
   - Uses Gmail (via **Nodemailer**) for sending email alerts.
   - Retrieves email credentials (`SYSTEM_EMAIL` and `SYSTEM_EMAIL_PASSWORD`) from environment variables.

---

## Usage Instructions

### Prerequisites
- Python 3.x
- Node.js
- `psutil` Python package (`pip install psutil`)
- Gmail account for sending alerts (Enable **"Allow less secure apps"** or use an app password)
- Environment variables:
  - `SYSTEM_EMAIL`: Sender email address
  - `SYSTEM_EMAIL_PASSWORD`: Password or app-specific password for the sender email

### Setup
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <repository_folder>
   ```

2. Install dependencies:
   - For Python:
     ```bash
     pip install psutil
     ```
   - For Node.js:
     ```bash
     npm install nodemailer
     ```

3. Configure the environment variables for the email credentials:
   - On Linux/MacOS:
     ```bash
     export SYSTEM_EMAIL="your_email@gmail.com"
     export SYSTEM_EMAIL_PASSWORD="your_password"
     ```
   - On Windows:
     ```cmd
     set SYSTEM_EMAIL=your_email@gmail.com
     set SYSTEM_EMAIL_PASSWORD=your_password
     ```

4. Run the monitoring script:
   ```bash
   python monitor.py
   ```

---

## Notes

- **Mailjet Alternative:** The original plan was to use Mailjet for email delivery. However, due to configuration challenges, the project was updated to use **Nodemailer** for email alerts.
