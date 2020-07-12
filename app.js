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
    // renderCafe(doc);//this pastes the list on the ui
    });
});

// //Getting data in a collection wiht condition
// where(field to check,how we want evaluate it,what want the conditio to be )
// how we want to evaluate it= can have different paramete such as <,>,==
// > this one to seach maybe with first alphabet e.g >n(i.e alphabet greater n and n iclusive should be selected)
db.collection('cafes').where('city','==','mario land').get().then((snapshot)=>{
    console.log(snapshot.docs);
    // to get data printed out individually for firebase we dothe following 
    snapshot.docs.forEach(doc => {
        // console.log(doc);
        // doing the abpve only show us the reference to the data from firbase 
        // to get data we add the .data() function to docs
        // console.log(doc.data());
        // renderCafe(doc);
    });
});

// //Getting data by Ordering 
// order data from firebase with keyword of ordering 
db.collection('cafes').orderBy("name").get().then((snapshot)=>{
    console.log(snapshot.docs);
    // to get data printed out individually for firebase we dothe following 
    snapshot.docs.forEach(doc => {
        // console.log(doc);
        // doing the abpve only show us the reference to the data from firbase 
        // to get data we add the .data() function to docs
        // console.log(doc.data());
        // renderCafe(doc);
    });
});

// ordering data with condition
// buh you ave to create a query index in the firebase consle
// goto firebase console and got to the index part to set up query condition

db.collection('cafes').where('city','==','ace city').orderBy("name").get().then((snapshot)=>{
    console.log(snapshot.docs);
    // to get data printed out individually for firebase we dothe following 
    snapshot.docs.forEach(doc => {
        // console.log(doc);
        // doing the abpve only show us the reference to the data from firbase 
        // to get data we add the .data() function to docs
        // console.log(doc.data());
    // renderCafe(doc);
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


// Getting data in real time from firebase
db.collection('cafes').orderBy('name').onSnapshot(snapshot =>{
    let changes=snapshot.docChanges();
    changes.forEach((change)=>{
        // console.log(change.doc.data());
        if (change.type=='added') {
            renderCafe(change.doc);
        } else if(change.type=='removed') {
            let li  = cafeList.querySelector('[data-id='+change.doc.id+']');
            cafeList.removeChild(li);
        }

    });
} );