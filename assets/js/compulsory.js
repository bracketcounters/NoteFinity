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

function confirmModal(message="Are you sure?") {
    let element = document.createElement("div");
    element.setAttribute("class", "bg-[#222222ad] fixed inset-0 flex items-center justify-center z-40 confirmModalParent");
    element.innerHTML = `<div class="bg-white rounded p-4 max-w-[90%] w-full z-50 confirmModal">
    <h3 class="text-sm font-semibold text-black">${message}</h3>
    <div class="flex space-x-1 my-2">
        <button id="confirmModalButtonOk" class="bg-green-600 text-white text-sm font-semibold px-1 py-0.5 outline-none rounded-sm">Ok</button>
        <button id="confirmModalButtonCancel" class="bg-red-600 text-white text-sm font-semibold px-1 py-0.5 outline-none rounded-sm">Cancel</button>
    </div>
</div>`;
document.body.appendChild(element);
_id("confirmModalButtonCancel").focus();
    return new Promise((resolve, reject)=>{
        _id("confirmModalButtonOk").addEventListener("click", ()=>{
            resolve(true);
            document.body.removeChild(element);
        });
        _id("confirmModalButtonCancel").addEventListener("click", ()=>{
            resolve(false);
            document.body.removeChild(element);
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