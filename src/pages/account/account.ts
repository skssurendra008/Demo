import { Component } from '@angular/core';

import { AlertController, NavController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';
import { Service } from '../../service/service';


@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
  providers: [Service]
})
export class AccountPage {
  username: string;

  constructor(public alertCtrl: AlertController, public nav: NavController, public userData: UserData,
              public service:Service) {

  }

  ngAfterViewInit() {
    this.getUsername();
  }

  updatePicture() {
    console.log('Clicked to update picture');
  }

  // Present an alert with the current username populated
  // clicking OK will update the username and display it
  // clicking Cancel will close the alert and do nothing
  changeUsername() {
    let alert = this.alertCtrl.create({
      title: 'Change Username',
      buttons: [
        'Cancel'
      ]
    });
    alert.addInput({
      name: 'username',
      value: this.username,
      placeholder: 'username'
    });
    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
        // updating into database
        if(data.username != this.username) {
          let updatedValue = {'user_username': this.username, 'user_newusername':data.username};
          this.service.updateDetails(updatedValue).subscribe(
            result => {
              console.log(result);
              if(result.message == "Updated Successfully.") {
                  this.username = data.username;
                  this.userData.setUsername(data.username);
                  this.userData.presentAlert("Congratulation !! ", "Username "+result.message);
                  //this.loading = false;
              }
              else {
                  //this.userExistsMessage = "User do not Exists";
                  //this.loading = false;
              }
             },
            (error) => {
                    console.log("Error happened" + error);
                    //this.userExistsMessage = "Server Error";
                    //this.loading = false;
            });
        }

        this.userData.setUsername(data.username);
        this.getUsername();

      }
    });

    alert.present();
  }

  changeUsername1() {
    let updatedValue = {'user_username': "data.username", 'user_password':'123'};
    this.service.updateDetails(updatedValue);
  }

  
  getUsername() {
    this.userData.getUsername().then((username) => {
      this.username = username;
    });
  }

  changePassword() {
    console.log('Clicked to change password');
    
  }

  logout() {
    this.userData.logout();
    this.nav.setRoot('LoginPage');
  }

  support() {
    this.nav.push('SupportPage');
  }
}
