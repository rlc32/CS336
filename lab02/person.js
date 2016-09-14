//CS 336 Lab02 Sept 14
//Russell Clousing (RLC32)
//javascript
//constructor
function Person(Name, Birthdate){
	this.Name = Name;
	this.Birthdate = Birthdate;
	this.Friends = [];
}
//function to change name
Person.prototype.ChangeName = function(NewName){
	this.Name = NewName;
}
//function to get age
Person.prototype.GetAge = function(){
	var today = new Date();
	var birthdate = new Date(this.Birthdate);
	var age = today.getFullYear() - birthdate.getFullYear();
	var m = today.getMonth() - birthdate.getMonth();
	if ( m < 0 || (m === 0 && today.getDate() < birthdate.getDate())){
		age--;
	}
	return age;
}
//add new friend
Person.prototype.AddFriend = function(newFriend){
	this.Friends.push(newFriend);
}
//greating
Person.prototype.greeting = function(){
	console.log("I'm a person");
}
//Student subclass
function Student(Name, Birthdate, Major){
	Person.call( this, Name, Birthdate);
	this.Major = Major;
}

Student.prototype = Object.create(Person.prototype);

Student.prototype.GetMajor = function(){
	return this.Major;
}
Student.prototype.ChangeMajor = function(newMajor){
	this.Major = newMajor;
}
Student.prototype.greeting = function(){
	console.log("i'm a student");
}
//testing
//create two people
var person1 = new Person("ethan", "1995/09/05");
var person2 = new Person("russell", "1996/05/25");
//change name
person1.ChangeName("Ethan");
person2.ChangeName("Russell");
//add eachother as friends
person1.AddFriend(person2);
person2.AddFriend(person1);
//print out friends
console.log("here is " + person1.Name +"'s friends: ");
console.log(person1.Friends);
console.log("here is " + person2.Name +"'s friends: ");
console.log(person2.Friends);
//print age
console.log(person1.Name + " is " + person1.GetAge() + " years old.");
console.log(person2.Name + " is " + person2.GetAge() + " years old.");
//print who is older
if (person1.GetAge() > person2.GetAge()){
	console.log(person1.Name + " is older then "+ person2.Name);
}
else{ console.log(person2.Name + " is older then "+ person1.Name)};
//greetings
person1.greeting();
person2.greeting();
//student tests
// create student
var student1 = new Student("mark", "1995/09/06", "computer science");
// test student is a person
console.log(student1 instanceof Person);
//test add friend
student1.AddFriend(person2);
console.log(student1.Friends);
//test age
console.log(student1.GetAge());
//test greeting
student1.greeting();
//test change major
console.log(student1.Name + " is a " + student1.Major + " major.");
student1.ChangeMajor("undecided");
console.log(student1.Name + " is a " + student1.Major + " major.");