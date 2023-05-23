const select = () => {
    /* Write queries for each of the following */

    /* Section 1 */
    // 1. Get all seeded fruit elements
    // Your code here
    const seeded = document.querySelectorAll(".seed");
    console.log(seeded);
    
    // 2. Get all seedless fruit elements
    // Your code here
    const seedless = document.querySelectorAll(".seedless");
    console.log(seedless);

    // 3. Get first seedless fruit element
    // Your code here
    const firstSeedless = document.querySelector(".seedless");
    console.log(firstSeedless);

    /* Section 2 */
    // 4. Get inner span with text "you"
    // Your code here
    const wrapper = document.getElementById("wrapper");
    const span = wrapper.children[0].children[0];
    console.log(span);



    // 5. Get all children of element "wrapper"
    // Your code here
    console.log(wrapper.children);

    // 6. Get all odd number list items in the list
    // Your code here
    const odds = document.querySelectorAll(".odd");
    console.log(odds);

    // 7. Get all even number list items in the list
    // Your code here
    const ol = document.getElementById("two").children[2];
    const evens = ol.querySelectorAll(":not(.odd)");
    console.log(evens);


    /* Section 3 */
    // 8. Get all tech companies without a class name
    // Your code here
    const techCompanies = document.getElementById("three").children[1];
    const noClassTechCompanies = techCompanies.children[0];
    console.log(noClassTechCompanies);

    // 9. Get "Amazon" list element
    // Your code here
    const amazon = document.querySelector(".shopping");
    console.log(amazon);

    // 10. Get all unicorn list elements (not the image element)
    // Your code here
    const listElements = document.getElementById("three").children[3].children
    console.log(listElements);

}

window.onload = select;