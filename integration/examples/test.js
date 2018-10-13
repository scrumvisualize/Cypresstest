/* =====================================
Author: Vinod Mathew
Testing tool: Cypress Beta Version 3.1.0
Node version: v8.11.4
JS Editor: Atom 1.31.2
Operating System: Windows 8.1 Pro
Processor: Intel Core i5 3.10GHZ
RAM: 8GB
Running on test runner: Chrome 69 and Electron 59
===========================================*/

//Simple test below to compare to two input values and log these values:-
describe('Compare two input values', function() {
  it('Test to compare two input values', function() {
	  var first_input =100;
	  var second_input = 100;
	expect(first_input).to.equal(second_input)
	cy.log(first_input, second_input)
  })
})


//Simple test below to test the title of a website:-
describe('Check the title of a website', function() {
   it('Test to check title contains ', function() {
    cy.visit('https://www.seleniumeasy.com/test/basic-checkbox-demo.html')
	  cy.title().should('contain', 'Selenium Easy - Checkbox demo for automation using selenium') // passes
  })
})

//Simple test below to test the values entered in a simple form:-
describe('Check the values entered in text fields ', function() {
  it('Test the name, email values entered in a text fields and verify it', function() {
  cy.visit('https://www.seleniumeasy.com/test/input-form-demo.html')
	cy.get('input[name="first_name"]').type('FirstName')
  cy.get('input[name="last_name"]').type('LastName')
	cy.get('input[name="email"]').type('test@example.com')
	cy
	.get('input[name="email"]')
	.invoke('val')
	.then(val => {
		const sometext = val;
		cy.log(sometext);
    expect(sometext).to.equal("test@example.com")
	})
	Cypress.on('uncaught:exception', (err, runnable) => {
	// returning false here prevents Cypress from
	// failing the test
   return false
    })
  })
})

//This is a demo test to test checkbox selection and verify the message:-
describe('Checkbox Selection test', function() {
	it('Check if the checkbox is selected and verify the message displayed', function() {
		cy.visit('http://www.seleniumeasy.com/test/basic-checkbox-demo.html')
		cy.get('#isAgeSelected').check()
		cy.get('#txtAge')
			.invoke('text')
			.then(text => {
				const someText = text;
				cy.log(someText);
				expect(someText).to.contain('Success - Check box is checked')
				});
	  })
})

//This is a demo test to test 'radio' button selection and verify the message:-
describe('Radio button selection test', function() {
	it('Check if the radio button is selected and text verified', function() {
		cy.visit('http://www.seleniumeasy.com/test/basic-radiobutton-demo.html')
		cy.get('[name="optradio"]').first().check()  // Check first radio element
		cy.get('#buttoncheck').click()
		cy.get('.radiobutton')
			.invoke('text')
			.then(text => {
				const someText = text;
				cy.log(someText);
				expect(someText).to.contain('Radio button \'Male\' is checked')
				});
	  })
})

//This is a filter test to verify the 'filter'selection works fine in a page:-
describe('Filter Test', function() {
	it('Check if the records are filtered successfully', function() {
		cy.visit('http://www.seleniumeasy.com/test/table-search-filter-demo.html')
		cy.get('button').contains('Filter').click()
		cy.get('input[placeholder="Username"]').type('jacobs')
		cy.get('table').contains('td', 'jacobs').should('be.visible');
	})
})

//This is a selection box test to verify the 'selected'value in a page:-
describe('Select the value from select box', function() {
	it('Check if the select box value is selected successfully', function() {
		cy.visit('http://www.seleniumeasy.com/test/basic-select-dropdown-demo.html')
		cy.get('#select-demo').select('Tuesday').should('have.value', 'Tuesday')
	 })

})

//The below test using stub allows us to test an alert message and check the text inside:-
describe('Test an alert via stub and check text displayed', function() {
it('Verify alert and its text content', function(){
	cy.visit('http://www.seleniumeasy.com/test/javascript-alert-box-demo.html')
	   const stub = cy.stub()
     cy.on ('window:alert', stub)
	cy
	.get('button').contains('Click me!').click()
     .then(() => {
      expect(stub.getCall(0)).to.be.calledWith('I am an alert box!')
    })
	})
})

//Cypress tests calling an Addition() & Subtraction() function written in 'commands.js' file:-
describe ('Calling a function from test', function(){
it('Call the sum function in commands.js and check the below cases', function(){
	cy
	.addValues(2, 4, 6)
    .should('be.gt', 10) // true, yeh ! sum greater than 10 !
    .and('be.lt', 20)    // true,  yeh! sum less than 20 !
	})

it('Call the Subtract function in commands.js and check the cases', function(){
	cy
	.subValues(15, 8)
    .should('eq', 7) // true, yeh ! by subtracting we get 7 !
	  .should('to.not.equal', 8) // true, yeh ! by subtracting, 7 is not equal to 8  !
	})
})

//Cypress tests reads values from data.json file saved in Cypress root folder and assert it :-
describe('Verify the data.json file', function() {
it('Check the values in data.json', function(){
	 cy.readFile("data.json").its('name').should('eq', 'Dan')
	 cy.readFile('data.json').its('email').should('eq', 'dan@example.com')
	 cy.readFile('data.json').its('country').should('eq', 'NewZealand')
  })
})

//Verify the API get method and check the following values are received:-
describe('Verify the API Get method', function(){
it('Check whether the userid, id and title is received in response message', function(){
		cy.request('GET', 'https://jsonplaceholder.typicode.com/posts/42')
			.then((response) => {
			// response.body is automatically serialized into JSON
			expect(response.body).to.have.property('userId', 5) // true
			expect(response.body).to.have.property('id', 42) // true
			expect(response.body).to.have.property('title', 'commodi ullam sint et excepturi error explicabo praesentium voluptas') // true
		})
	})
})

//Verify the cypress test to receive the response status 200 :-
describe('Verify response 200 is received', function(){
it('Check whether the response 200 is received', function(){
		cy.request('GET', 'https://jsonplaceholder.typicode.com/posts/42')
			.then((response) => {
			 expect(response.status).to.eq(200)
	 })
  })
})

//Cypress test using a Wrap function and object passed into the wrap method:-
describe('Object passed into Wrap method', function() {
	it.skip('Check if the object passed into Wrap method and call BMI ', function() {
		const getBMI= (weight, height) => {
		var weight ;
		var height ;
		var hghtintoMtr = height / 100;
		var squareHght = hghtintoMtr * hghtintoMtr;
		var bmi = parseFloat(weight/squareHght).toFixed(2) ;
		return bmi
		}
		cy.wrap({ bmi: getBMI }).invoke('bmi', 78, 176).should('eq', '25.18') // true
		cy.wrap({ bmi: getBMI }).invoke('bmi', 85, 181).should('eq', '25.95') // true
	})
})

//Cypress test using a 'writeFile' method to write json data to a file in the following location:-
describe('Write to file and verify data', function(){
	it('Check whether the writing to file and verify the json data', function(){
		cy.writeFile('/path/to/data.json', {name: 'Apple2', email: 'apple2@example.com'})
		.then((user) => {
			let jsonUser = JSON.parse(user)
			expect(jsonUser.name).to.equal('Apple2')
			expect(jsonUser.email).to.equal('apple2@example.com')
		})
	})
})

//Cypress test reading username, password values from Cypress.env file and pass into text fields:-
describe("Login test that reads values from Cypress.env file ", () => {
    it.only('Verify the login to the application is successfull', function() {
        cy.visit('http://testing-ground.scraping.pro/login')
        cy.wait(2000)
        cy.get('input[name="usr"]').type(Cypress.env("username"))
        cy.get('input[name="pwd"]').type(Cypress.env("password"))
        cy.get('input[type="submit"]').click()
        cy.get('#case_login h3').invoke('text')
        .then((text)=>{
          const successText = text;
          expect(successText).to.equal("WELCOME :)")
        })
    })

})

//Cypress test using 'before' method, XHR post method to check the status 200 received :-
describe('XHR POST form submission test', () => {
  before(() => {
      cy.visit('https://resttesttest.com/')
    })
    it('Verify whether the successfull submits of an XHR POST method on form submission', () => {
			cy.wait(3000)
		  cy.get('#httpmethod').select('POST')
			cy.get('#urlvalue').clear()
			cy.get('#urlvalue').type('https://httpbin.org/post')
			cy.get('#addprambutton').click()
			cy.get('.input-medium.fakeinputname:last').type('name', {force: true})
			cy.get('.input-xlarge.realinputvalue:last').type('Daniel', {force: true})
			cy.server();
            cy.route('POST', '/post').as('paramform') // note that the route needs to match trailing slashes
            cy.get('#submitajax').click()
                .wait('@paramform')
                .its('status').should('equal', 200)
        .then(() => {
            cy.get('#statuspre').contains('HTTP 200 OK').should('exist')
        })
    })
})
