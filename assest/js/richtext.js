

let optionsButtons = document.querySelectorAll(".option-btn");
let advancedOptionButtom = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea = document.getElementById("contenido");
let linkButton = document.getElementById("createLink");
let imgButton = document.getElementById("insertImg");
let alignButton = document.querySelectorAll(".align");
let spacingButton = document.querySelectorAll(".spacing");
let formatButton = document.querySelectorAll(".format");
let scriptButton = document.querySelectorAll(".script");

//lista de fuentes
let fontList = [
    "Arial", 
    "Verdana", 
    "Times New Roman", 
    "Garamond", 
    "Georgia", 
    "Courier New", 
    "Tahoma"
];



//funcion para agregar imagen
const insertImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = () => {
        const file = input.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            const img = new Image();
            img.src = reader.result;
            img.width = "300"; // Establece el ancho de la imagen
            const div = document.createElement('div');
            div.contentEditable = 'true';
            div.appendChild(img);
            document.execCommand('insertHTML', false, div.outerHTML);
        };
        
        reader.readAsDataURL(file);
    };
    input.click();
};



//Configureacion inicial
const initializer = () => {
    highlighter(alignButton, true);
    highlighter(spacingButton, true);
    highlighter(formatButton, false);
    highlighter(scriptButton, true);

    fontList.map((value) => {
        let option = document.createElement("option");
        option.value = value;
        option.innerHTML = value;
        fontName.appendChild(option);
    });

    for (let i = 1; i<= 7; i++){
        let option = document.createElement("option");
        option.value = i;
        option.innerHTML = i;
        fontSizeRef.appendChild(option);
    }

    fontSizeRef.value = 3;
} 

const modifyText = (command, defaultUi, value) => {
    document.execCommand(command, defaultUi, value);
}

optionsButtons.forEach((button) => {
    button.addEventListener("click", () => {
        modifyText(button.id, false, null);
    });
});


advancedOptionButtom.forEach((button)=>{
    button.addEventListener("change", () => {
        modifyText(button.id, false, button.value);
    });
});

linkButton.addEventListener("click", () =>{
    let usrLink = prompt("Ingresa una URL");
    if(/http/i.test(usrLink)){
        modifyText(linkButton.id, false, usrLink);
    } else {
        usrLink = "http://" + usrLink;
        modifyText(linkButton.id, false, usrLink);
    }
})

imgButton.addEventListener("click", insertImage);


const highlighter = (className, needsRemoval) => {
    className.forEach((button) => {
        button.addEventListener("click", () =>{
            if (needsRemoval){
                let AlreadyActive = false;
            

            if(button.classList.contains("active")){
                AlreadyActive = true;
            }

            highlighterRemover(className);
                if(!AlreadyActive){
                    button.classList.add("active");
                }
        }
        else {

            button.classList.toggle("active");

            }

        });
        
    });
};

const highlighterRemover = (className) => {
    className.forEach((button) => {
        button.classList.remove("active");
    })
}

window.onload = initializer();


