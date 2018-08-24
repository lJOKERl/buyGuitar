const makeItem = (name, model, year, price, owner, phone, images) => ({name, model, year, price, owner, phone, images})
const log = (text, type, date = new Date()) => ({text, type, date})

const guitars = [
	makeItem("Epiphone", "SG", "2016", "17500", "Евгений", "+7 (915) 36-55-809", "images/epiphone-sg-special.jpg"),
	makeItem("Gibson", "Les Paul", "2018", "80000", "Евгений II", "+7 (936) 23-22-643", "images/gibson-les-paul.jpg"),
	makeItem("Ibanez", "GIO", "2017", "24700", "Омар Васильевич", "+7 (918) 55-96-850", "images/ibanes-gio.jpg"),
	makeItem("Yamaha", "Pacifica 012", "2006", "14999", "Александр", "+7 (915) 15-75-100", "images/yamaha-pacifica.jpg"),
]

new Vue ({
	el: "#app",
	data: {
		guitars: guitars,
		guitar: guitars[0],
		selectGuitarIndex: 0,
		isPhoneVisible: false,
		isModal: false,
		search: "",
		logs: [],
	},
	computed: {
		getInfo() {
			return this.guitar.name + " - " + this.guitar.model;
		},
		showPhone() {
			return this.isPhoneVisible ? this.guitar.phone : "Показать телефон";
		},
		filteredGuitars() {
			const filtered = this.guitars.filter(guitar =>
					guitar.name.toLowerCase().indexOf(this.search) > -1 || 
					guitar.name.toUpperCase().indexOf(this.search) > -1 || 
					guitar.model.toLowerCase().indexOf(this.search) > -1 || 
					guitar.model.toUpperCase().indexOf(this.search) > -1 
			)

			return filtered
		}
	},
	methods: {
		selectGuitar(index) {
			this.guitar = this.guitars[index];
			this.selectGuitarIndex = index;
		},
		newOrder() {
			this.isModal = false
			this.logs.push(
				log(`Вы купили: ${this.guitar.name} - ${this.guitar.model}`, "ok")
			)
		},
		cancelOrder() {
			this.isModal = false
			this.logs.push(
				log(`Вы просмотрели: ${this.guitar.name} - ${this.guitar.model}`, "cancel")
			)
		}
	},
	filters: {
		date(value) {
			return value.toLocaleString();
		}
	}
});