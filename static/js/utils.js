/**
 * Adjust element height dynamically.
 * (Used for textarea height)
 *
 * @param element       Element
 */
function autoGrow(element) {

    element.style.height = (window.innerHeight - 60) + "px";

    /*if (element.style.height > window.innerHeight) {
        element.style.height = "5px";
        element.style.height = (element.scrollHeight)+"px";
    }*/
}