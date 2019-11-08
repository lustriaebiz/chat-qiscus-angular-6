import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * qiscus SDK
 */
import QiscusSDK from 'qiscus-sdk-core';
const qiscus = new QiscusSDK();

/**
 * interface
 */
import { iComment } from 'src/app/interfaces/iComment';
import { iUser } from 'src/app/interfaces/iUser';

/**
 * APP ID QISCUS
 */
const APP_ID = "cakap-cha-p5xayo2hsuw";
const API = "https://"+APP_ID+".qiscus.com/api/v2/sdk";

/**
 * Config Qiscus
 */
const configQiscus = {
  AppId: 'cakap-cha-p5xayo2hsuw',
  baseURL: 'https://cakap-cha-p5xayo2hsuw.qiscus.com',
  options: {
    newMessagesCallback : messages => this.newMessagesCallback(messages),
    loginSuccessCallback: (data) => { },
    loginErrorCallback: (data) => { },
    chatRoomCreatedCallback: (data) => { },
    groupRoomCreatedCallback: (data) => { },
    headerClickedCallback: (data) => { },
    onReconnectCallback: function (data) { }
  }
}

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  public messages = [];

  constructor(
    private http: HttpClient
    ) { }

  initialize() {
    qiscus.init(configQiscus);
  }

  loginOrRegister(data: iUser) {
    return qiscus.setUser(data.email, data.password, data.username);
  }

  createRoom(data: iUser) {
      return qiscus.chatTarget(data.email);
  }

  createGroupRoom(data: iUser, room_name, options) {
    return qiscus.createGroupRoom(room_name, data.email, options);
  }

  sendComment(data: iComment) {
    return qiscus.sendComment(data.roomId, data.comment);
  }

  isInit () { 
    return qiscus.isInit;
  }

  newMessagesCallback(messages) {
    console.log('messages: ', messages);
    this.messages.push(messages);
    return true;
    
    // return messages;
  }

}
