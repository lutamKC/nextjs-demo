import {child, get, getDatabase, ref, set, remove} from "@firebase/database";
import {initializeApp} from "firebase/app";
import firebaseConfig from "../config/firebase.config";
import catApiKey, {mapCategoryToCats} from '../config/catapi.config';

const app = initializeApp(firebaseConfig);
const firebaseDB = getDatabase(app);



export const getCatById = (catId: string) => {
    const headers = {
        headers: {
            'X-Api-Key': catApiKey
        },
    };
    return fetch(`https://api.thecatapi.com/v1/images/${catId}`, headers).then(response => {
        return response.json();
    })
}

export const getCatsFavourite = (() => {
    const dbRef = ref(firebaseDB, '/');
    return get(child(dbRef, `cats`)).then((snapshot: any) => {
            if (snapshot.exists()) {
                const catsIds = Object.keys(snapshot.val());
                return Promise.all(catsIds.map(async (catId: string) => getCatById(catId).then(catData => catData)));
            }
        }
    )
});


export const removeCatAsFavourite = (catId: string) => {
    const dbRef = ref(firebaseDB, '/cats/');
    remove(child(dbRef, catId))
        .then(function () {
            console.log("Remove succeeded.")
        })
}


export const getCatsCategories = (() => {
    return fetch('https://api.thecatapi.com/v1/categories')
        .then(res => res.json())
        .then(data => data.map((category: { name: string }) => ({params: {id: category.name}})));
});

export const getCatsByCategoryId = ((categoryName: string) => {
    // @ts-ignore
    const catsIdsByCategory = mapCategoryToCats[categoryName];
    return Promise.all(catsIdsByCategory.map(async (catId: string) => getCatById(catId).then(catData => catData)));

});

export const setCatAsFavourite = (catId: string) => {
    set(ref(firebaseDB, '/cats/' + catId), Date.now());
}



