
//grabbing form
const form = document.getElementById('info-request__form');

//grabbing inputs
let name = document.getElementById('full-name');
let nameFurigana = document.getElementById('name-furigana');
let email = document.getElementById('txtEmail');
let phone = document.getElementById('phone');
let address = document.getElementById('address');
let zipcode = document.getElementById('zipcode');
let comment = document.getElementById('comment');



function formValidation(){
    //check all inputs(except comment) is filled and correct
    if (emailValidation(email) && nameValidation(name) && nameFuriValidation(nameFurigana) && phoneValidation(phone) && addressValidation(address) && zipcodeValidation(zipcode)){
        //.message will appear with .message__success
        $('.message').removeClass('hide');
        $('.message__success').removeClass('hide');
        $('.message__error').addClass('hide');
        console.log("success");
        return true;
    } else {
        //.message will appear with .message__error
        $('.message').removeClass('hide');
        $('.message__success').addClass('hide');
        $('.message__error').removeClass('hide');
        console.log("something is wrong");

        return false;
    }
}

function nameValidation(name){
    //check if the input is empty
    if(name.value != "" ){
        console.log("name:true");
        return true;
    }
    console.log("name:false");
}

function nameFuriValidation(nameFuri){
    let regex = /^[\u{3000}-\u{301C}\u{30A1}-\u{30F6}\u{30FB}-\u{30FE}]+$/mu;
    //check if the input is empty, if it's not return if name is hiragana or not
    if(nameFuri.value != "" ){
        console.log("nameF:" + regex.test(nameFuri.value));
        return regex.test(nameFuri.value);
        
    }

}

function emailValidation(email){
    let mail = email.value;
    var mail_regex1 = new RegExp( '(?:[-!#-\'*+/-9=?A-Z^-~]+\.?(?:\.[-!#-\'*+/-9=?A-Z^-~]+)*|"(?:[!#-\[\]-~]|\\\\[\x09 -~])*")@[-!#-\'*+/-9=?A-Z^-~]+(?:\.[-!#-\'*+/-9=?A-Z^-~]+)*' );
    var mail_regex2 = new RegExp( '^[^\@]+\@[^\@]+$' );
    if( mail.match( mail_regex1 ) && mail.match( mail_regex2 ) ) {
        // 全角チェック
        if( mail.match( /[^a-zA-Z0-9\!\"\#\$\%\&\'\(\)\=\~\|\-\^\\\@\[\;\:\]\,\.\/\\\<\>\?\_\`\{\+\*\} ]/ ) ) { 
            console.log("email:false");
            return false; 
        }
        // 末尾TLDチェック（〜.co,jpなどの末尾ミスチェック用）
        if( !mail.match( /\.[a-z]+$/ ) ) { 
            console.log("email:false");
            return false; 
        }
        console.log("email:true");
        return true;
        
    } else {
        console.log("email:false");
        return false;
    }
}

function phoneValidation(phone){
    let tel = phone.value.replace(/[━.*‐.*―.*－.*\-.*ー.*\-]/gi,'');
    if (!tel.match(/^(0[5-9]0[0-9]{8}|0[1-9][1-9][0-9]{7})$/)) 
    {
        console.log("phone:false");
        return false;
    } else {
        console.log("phone:true");
        return true;
    }
}

function addressValidation(address){
    if (address.value == '') {
        console.log("address:false");
        return false;
    } else {
        console.log("address:true");
        return true;
    }
}

function zipcodeValidation(zipcode){
    let zipcodeConverted = zipcode.value.replace(/[━.*‐.*―.*－.*\-.*ー.*\-]/gi,'');
    if (!zipcodeConverted.match(/^([1-9]\d*|0)$/)){
        console.log("zipcode:false");
        return false;
    } else {
        console.log("zipcode:true");
        return true;
    }
}





//push data from the form

function pushData(name, nameFurigana, email, phone, address, zipcode, comment){
    
    
    //push data
    firebase.database().ref("customer-info").push().set(
        {
            name: name.value,
            nameFurigana: nameFurigana.value,
            email: email.value,
            phone: phone.value,
            address: address.value,
            zipcode: zipcode.value,
            comment: comment.value,

        }
    )
    .then()
    .catch((error) => {
        console.error('ダウンロードエラー:', error);
        $(".message__success").addClass("hide");
        $(".message").removeClass("hide");
        $(".message__error").removeClass("hide");
    });
};

//empty the values of inputs
function emptyInputs () {
    name.value = "";
    nameFurigana.value = "";
    email.value  = ""
    phone.value = ""; 
    address.value  = "";
    zipcode.value = "";
    comment.value  = "";
};

if(form){
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let validForm = formValidation();
        if(validForm){
            //push data
            pushData(name, nameFurigana, email, phone, address, zipcode, comment);

            //empty input value after pushing data
            emptyInputs();

            return;
        } 

        alert("フォームを送信できませんでした");
    });
}