const brevo = require('@getbrevo/brevo');


let apiInstance = new brevo.TransactionalEmailsApi();
let sendSmtpEmail = new brevo.SendSmtpEmail();
let url=process.env.url;
let apiKey = apiInstance.authentications['apiKey'];
apiKey.apiKey="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";
module.exports.enviarCorreo = async function (direccion,key,mensaje) {
sendSmtpEmail.subject = "MiApp-Confirmacion de cuenta";
sendSmtpEmail.htmlContent = "<html><body><h1>Confirma la cuneta</h1><a href="+url+"/confirmarUsuario/"+direccion+"/"+key+"</body></html>";
sendSmtpEmail.sender = { "name": "Emilio", "email": "emilioojose42@gmail.com" };
sendSmtpEmail.to = [ 
  { "email": direccion, "name": direccion }
];
//sendSmtpEmail.replyTo = { "email": "brevo@brevo.com", "name": "John" };
//sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
//sendSmtpEmail.params = { "parameter": "My param value", "subject": "common subject" };
//sendSmtpEmail.messageVersions = [{

apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
  console.log('API called successfully. Returned data: ' + JSON.stringify(data));
}, function (error) {
  console.error(error);
});
}