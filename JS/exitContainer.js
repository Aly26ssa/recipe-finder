import { ingredientsExitButton, ingredientsContainer } from './classNames.js';

// Hide ingredients container
function exitContainer() {
    ingredientsContainer.classList.add("hidden");
    document.body.style.overflow = "";
}

// Close ingredients button functionality
ingredientsExitButton.addEventListener('click', exitContainer);