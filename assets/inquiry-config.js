/* Public settings only. Do not add mail passwords or API secrets.
 * The recipient must also be fixed on the server to wft@wifinetech.co.kr.
 * After the new hosting and DaouOffice SMTP are configured, set endpoint to
 * the deployed same-origin handler path. It must accept POST FormData and
 * return JSON {"ok":true} only after the mail server accepts the message.
 * Leave empty until the server is ready and actual inbox receipt is verified.
 * No SMTP handler is included in this static GitHub update.
 */
window.WFT_INQUIRY_CONFIG = Object.freeze({
  endpoint: '',
  recipient: 'wft@wifinetech.co.kr'
});
