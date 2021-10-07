import {makeAutoObservable} from "mobx";


export default class ProductStore {
    constructor(){
        this._types = []

        this._brands = []

        this._products = []

        this._cartProduct = [
            {id:1, name: "asus 210", price: 499, count:2, img: "https://upload.wikimedia.org/wikipedia/commons/5/50/FPO.png"},
            {id:2, name: "asus 210", price: 499, count:1, img: "https://upload.wikimedia.org/wikipedia/commons/5/50/FPO.png"},
            {id:3, name: "asus 210", price: 499, count:1, img: "https://upload.wikimedia.org/wikipedia/commons/5/50/FPO.png"},
            {id:4, name: "asus 210", price: 499, count:3, img: "https://upload.wikimedia.org/wikipedia/commons/5/50/FPO.png"},
        ]

        this._selectedType = {}
        this._selectedBrand = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 4

        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }

    setBrands(brands) {
        this._brands = brands
    }

    setProducts(products) {
        this._products = products
    }


    setSelectedType(type) {
        this.setPage(1)
        this._selectedType = type
    }
    
    setSelectedBrand(brand) {
        this.setPage(1)
        this._selectedBrand = brand
    }

    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }

    get types() {
        return this._types
    }
    get brands() {
        return this._brands
    }
    get products() {
        return this._products
    }



    get selectedType() {
        return this._selectedType
    }
    get selectedBrand() {
        return this._selectedBrand
    }

    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }

}