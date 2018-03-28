import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') ngForm: NgForm;
  defaultQuestion = 'pet';
  answer = '';
  genders = ['male', 'female'];
  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: ''
  };
  submitted = false;

  suggestUserName() {
    const suggestedName = 'Superuser';
    /*this.ngForm.setValue({
      userData: {
        username: suggestedName,
        email: ''
      },
      secret: 'pet',
      questionAnswer: '',
      gender: 'male'
    });*/
    this.ngForm.form.patchValue({
      userData: {
        username: suggestedName
      }
    });
  }

  onSubmit() {
    this.user.username = this.ngForm.value.userData.username;
    this.user.email = this.ngForm.value.userData.email;
    this.user.secretQuestion = this.ngForm.value.secret;
    this.user.answer = this.ngForm.value.questionAnswer;
    this.user.gender = this.ngForm.value.gender;
    this.submitted = true;

    this.ngForm.reset();
  }

}
