const cafeList=document.querySelector("#cafe-list");
const form=document.querySelector('#add-cafe-form');

// create a html element template to render cafelist
function renderCafe(doc){
    let li=document.createElement('li');
    let name=document.createElement('span');
    let city=document.createElement('span');
    let cross=document.createElement('div');

    li.setAttribute('data-id',doc.id);
    name.textContent=doc.data().name;
    city.textContent=doc.data().city;
    cross.textContent="x";

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);

    // deleting data 
    cross.addEventListener('click',(e)=>{
        e.stopPropagation();//this stop evenets from bubblin up on the dom
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('cafes').doc(id).delete();
    });

    cafeList.appendChild(li);
}


// getting data
// get all data in a collection
db.collection('cafes').get().then((snapshot)=>{
    console.log(snapshot.docs);
    // to get data printed out individually for firebase we dothe following 
    snapshot.docs.forEach(doc => {
        // console.log(doc);
        // doing the abpve only show us the reference to the data from firbase 
        // to get data we add the .data() function to docs
        // console.log(doc.data());
        renderCafe(doc);
    });
});


//saving data
form.addEventListener('submit',(e)=>{
    e.preventDefault();
   console.log( form.name.value);
   console.log( form.city.value);

    db.collection('cafes').add({
        "name":form.name.value,
        "city":form.city.value
    });
    form.name.value='';
    form.city.value='';

});