import { Component, OnInit } from '@angular/core';
import { UserService } from './service/user.service';
import { iUser } from 'src/app/interfaces/iUser';
import { ChatService } from '../chat/service/chat.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  
  users: iUser[]
  chatBox = null;
  comment = '';

  constructor(
    private userService : UserService, 
    private chatService : ChatService
  ) { }

  ngOnInit(): void {
    this.chatService.initialize();
    this.loginOrRegister();

    this.userService.getUsers().then(users => this.users = users);    
  }

  sendComment() {
    let data = {
      comment : this.comment,
      roomId : this.chatBox.id
    }

    this.chatService.sendComment(data).then(
      res => {
        console.log('sendComment success: ', res);
      },
      err => {
        console.log('sendComment error: ', err)
      }
    )
  }

  createRoom(user: iUser) {

    if(!this.chatService.isInit()){
      console.log('please login!');
      return;
    }
    
    this.chatBox = null;

    this.chatService.createRoom(user)
    .then(
    res => {
      this.chatBox = res;
      console.log('createRoom res: ', res);
    }, 
    err => {
      console.log('createRoom error: ', err);
    }, 
    () => {
      console.log('createRoom done');
      
    });
  }

  createGroupRoom(user: iUser) {
      if(!this.chatService.isInit()){
        console.log('please login!');
        return;
      }
      
      this.chatBox = null;
      let group_name = 'test';
      let options = {
        avatarURL : "http://avatar_url"
        //other data
       }

      this.chatService.createGroupRoom(user, group_name, options)
      .then(
      res => {
        this.chatBox = res;
        console.log('createGroupRoom res: ', res);
      }, 
      err => {
        console.log('createGroupRoom error: ', err);
      }, 
      () => {
        console.log('createGroupRoom done');
        
      });
  }

  loginOrRegister() {
    /**
     * setUser
     */
    let data = {
      username: 'lustria',
      email: 'lustria@gmail.com',
      password: 'password'
    };

    this.chatService.loginOrRegister(data);
    
    /** */
    console.log('message test: ', this.chatService.messages);
    
  }

}
