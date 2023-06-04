function _id(elm) {
    return document.getElementById(elm);
}
function _cls(elms) {
    return document.querySelectorAll(`.${elms}`);
}
function _elm(elm) {
    return document.querySelector(elm);
}
function _elms(elms) {
    return document.querySelectorAll(elms);
}

function extensionOf(filename) {
    const parts = filename.split('.');
    if (parts.length == 1) {
    return '';
    }
    return parts.pop();
}

function confirmModal(message="Are you sure?") {
    let element = document.createElement("div");
    element.setAttribute("class", "bg-[#222222ad] fixed inset-0 flex items-center justify-center z-40 confirmModalParent");
    element.innerHTML = `<div class="bg-white rounded p-4 max-w-[400px] w-[90%] z-50 confirmModal">
    <h3 class="text-sm font-semibold text-black">${message}</h3>
    <div data-label="confirmModalForm" class="flex space-x-1 my-2">
        <button id="confirmModalButtonOk" class="bg-green-600 text-white text-sm font-semibold px-1 py-0.5 outline-none rounded-sm outline-offset-0 focus:outline focus:outline-green-200">Ok</button>
        <button id="confirmModalButtonCancel" class="bg-red-600 text-white text-sm font-semibold px-1 py-0.5 outline-none rounded-sm outline-offset-0 focus:outline focus:outline-red-200">Cancel</button>
    </div>
</div>`;
document.body.appendChild(element);
_id("confirmModalButtonOk").focus();
window.addEventListener("keydown", (e)=>{
    if (e.key == "Escape") {
        try {document.body.removeChild(element);} catch(err){}
    }
})
    return new Promise((resolve, reject)=>{
        _id("confirmModalButtonOk").addEventListener("click", ()=>{
            resolve(true);
            try {document.body.removeChild(element);} catch(err){}
        });
        _id("confirmModalButtonCancel").addEventListener("click", ()=>{
            resolve(false);
            try {document.body.removeChild(element);} catch(err){}
        });
    })
    /* 
    <div class="bg-[#222222ad] fixed inset-0 flex items-center justify-center z-40 confirmModalParent">
        <div class="bg-white rounded p-4 max-w-[90%] w-full z-50 confirmModal">
            <h3 class="text-sm font-semibold text-black">If you quit, unsaved data may lost</h3>
            <div class="flex space-x-1 my-2">
                <button class="bg-green-600 text-white text-sm font-semibold px-1 py-0.5 outline-none rounded-sm">Ok</button>
                <button class="bg-red-600 text-white text-sm font-semibold px-1 py-0.5 outline-none rounded-sm">Cancel</button>
            </div>
        </div>
    </div>
    */
}

function alertModal(message="Alert", type="info") {
    let element = document.createElement("div");
    element.setAttribute("class", "bg-[#222222ad] fixed inset-0 flex items-center justify-center z-40 confirmModalParent");

    let buttonColor = "sky";
    if (type == "success") {
        buttonColor = "green";
    }
    else if (type == "error") {
        buttonColor = "red";
    }

    element.innerHTML = `<div class="bg-white rounded p-4 max-w-[400px] w-[90%] z-50 confirmModal">
    <h3 class="text-sm font-semibold text-black">${message}</h3>
    <div data-label="confirmModalForm" class="flex space-x-1 my-2">
        <button id="confirmModalButtonOk" class="bg-${buttonColor}-600 text-white text-sm font-semibold px-1 py-0.5 outline-none rounded-sm outline-offset-0 focus:outline focus:outline-${buttonColor}-200">Ok</button>
    </div>
</div>`;
    document.body.appendChild(element);
    _id("confirmModalButtonOk").focus();
    window.addEventListener("keydown", (e)=>{
        if (e.key == "Escape") {
            try {document.body.removeChild(element);} catch(err){}
        }
    })
    return new Promise((resolve, reject)=>{
        _id("confirmModalButtonOk").addEventListener("click", ()=>{
            resolve(true);
            try {document.body.removeChild(element);} catch(err){}
        });
    })
}

function promptModal(prompt="Enter value", defaultValue="", type=null) {
    let element = document.createElement("div");
    element.setAttribute("class", "bg-[#222222ad] fixed inset-0 flex items-center justify-center z-40 promptParent");

    element.innerHTML = `<form id="promptForm" class="bg-white rounded p-4 max-w-[400px] w-[90%] z-50 promptModal">
    <h3 class="text-sm font-semibold text-black">${prompt}</h3>
    <input type="text" id="promptInput" class="text-sm py-0.5 mt-1 w-full border-b border-b-gray-400 outline-0" value="${defaultValue}">
    <div data-label="promptForm" class="flex space-x-1 my-2">
        <button id="promptButtonOk" type="submit" class="bg-green-600 text-white text-sm font-semibold px-1 py-0.5 outline-none rounded-sm outline-offset-0 focus:outline focus:outline-green-200">Ok</button>
        <button id="promptButtonCancel" type="button" class="bg-sky-600 text-white text-sm font-semibold px-1 py-0.5 outline-none rounded-sm outline-offset-0 focus:outline focus:outline-sky-200">Cancel</button>
    </div>
</form>`;
    document.body.appendChild(element);
    if (type == "rename") {
        let selectionValue = _id("promptInput").value;
        let endRange = selectionValue.substr(0, selectionValue.length - extensionOf(selectionValue).length - 1);
        _id("promptInput").setSelectionRange(0, endRange.length);
        _id("promptInput").focus();
    }
    else {
        _id("promptInput").select();
        _id("promptInput").focus();
    }
    window.addEventListener("keydown", (e)=>{
        if (e.key == "Escape") {
            try {document.body.removeChild(element);} catch(err){}
        }
    })
    return new Promise((resolve, reject)=>{
        _id("promptButtonCancel").addEventListener("click", ()=>{
            document.body.removeChild(element);
            resolve(false);
        })
        _id("promptForm").addEventListener("submit", (event)=>{
            event.preventDefault();
            let promptValue = _id("promptInput").value;
            if (promptValue == "") {
                resolve(false);
            }
            else {
                resolve(promptValue);
            }
            document.body.removeChild(element);
        })
    })
}



class ProgressView {
    constructor() {
        this.element = document.createElement("div");
    }
    modal(text="Please wait...") {
        this.element.setAttribute("class", "bg-[#22222288] fixed inset-0 flex justify-center items-center z-40 progressModalParent");
        this.element.innerHTML = `<div class="bg-white rounded p-6 max-w-[400px] w-[90%] z-50 flex justify-between items-center progressModal">
        <h3 class="text-sm font-semibold text-black">${text}</h3>
        <img src="../../assets/icons/loader.svg" alt="Loader" class="w-6 loaderAnimation">
        </div>`;
        document.body.appendChild(this.element);
    }
    close() {
        try {
            document.body.removeChild(this.element);
        }
        catch(err) {}
    }
    loader() {
        this.element.setAttribute("class", "bg-[#ffffff98] fixed inset-0 flex justify-center items-center z-40 progressModalParent");
        this.element.innerHTML = `<img src="../../assets/icons/loader.svg" class="w-10 loaderAnimation">`
        document.body.appendChild(this.element);
        setTimeout(() => {
            this.close();
        }, 10000);
    }
}

        // Drag and Drop Feature
        class FileDragger {
            constructor(text="Drag Files to Open") {
                this.div = document.createElement("div");
                this.div.setAttribute("class", "fixed inset-0 z-20 bg-[#ffffffbb] hidden justify-center items-center fileDraggerParent");
                this.div.innerHTML = `<div class="border-2 border-gray-600 border-dashed p-8 w-[60vw] m-auto flex justify-center items-center pointer-events-none">
                <p class="font-semibold text-gray-600">${text}</p>
            </div>`;
                this.opened = false;
            }
            open() {
                return new Promise((resolve, reject)=>{
                    if (!this.opened) {
                        document.body.appendChild(this.div);
                        this.div.classList.remove("hidden");
                        this.div.classList.add("flex");
                        this.opened = true;
                        this.div.addEventListener("drop", (event)=>{
                            let files = Array.from(event.dataTransfer.files);
                            this.close();
                            resolve(files);
                        })
                        this.div.addEventListener("dragleave", (event)=>{
                            this.close();
                            resolve([]);
                        })
                    }
                    else {
                        this.div.classList.remove("hidden");
                        this.div.classList.add("flex");
                    }
                })
            }
            close() {
                if (this.opened) {
                    this.div.classList.remove("flex");
                    this.div.classList.add("hidden");
                    document.body.removeChild(this.div);
                    this.opened = false;
                }
            }
        }

