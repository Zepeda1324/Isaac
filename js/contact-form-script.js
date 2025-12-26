$("#contactForm").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        formError();
        submitMSG(false, "Revisa los campos del formulario");
    } else {
        // everything looks good!
        event.preventDefault();
        submitForm();
    }
});


function submitForm(){
    // Initiate Variables With Form Content
    var name = $("#name").val();
    var email = $("#email").val();
    var phone = $("#number").val();
    var message = $("#message").val();

    // Phone validation: allow spaces for aesthetics; optional single leading '+' then digits only
    var phoneTrim = (phone || "").trim();
    var phoneSanitized = phoneTrim.replace(/\s+/g, "");
    var phoneOk = /^\+?\d+$/.test(phoneSanitized);
    if (!phoneOk) {
        formError();
        submitMSG(false, "Teléfono inválido: usa solo dígitos y un '+' inicial opcional");
        return;
    }

    var subject = "Contacto desde el sitio web";
    var body = "Nombre: " + name + "\n" +
               "Email: " + email + "\n" +
               "Teléfono: " + phoneTrim + "\n\n" +
               "Mensaje:" + "\n" + "\n"  +
               message + "\n";

    var mailtoLink = "mailto:aizepeda@ucemich.edu.mx" +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

    window.location.href = mailtoLink;
    formSuccess();
}

function formSuccess(){
    $("#contactForm")[0].reset();
    submitMSG(true, "Mensaje enviado")
}

function formError(){
    $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass();
    });
}

function submitMSG(valid, msg){
    if(valid){
        var msgClasses = "h3 text-center tada animated text-success";
    } else {
        var msgClasses = "h3 text-center text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}