import { OutRecord } from './data/outRecord';
import { PunchInfo } from './punchinfo';
import { OutInfo } from './outinfo';
import { LeaveInfo } from './leaveinfo';
import { UserInfo } from './userinfo';
import { User } from './user';
import { LeaveRecord } from './data/leaverecord';
import { PunchRecord } from './data/punchrecord';

export class SavedUser {
  static user: User;
  static userinfo: UserInfo;
  static userLeaveSelf: LeaveInfo[];
  static userOutSelf: OutInfo[];
  static userPunchSelf: PunchInfo[];
  static leaveRecord: LeaveRecord[];
  static outRecord: OutRecord[];
  static punchRecord: PunchRecord[];

  public static getUser(): User {
    return SavedUser.user;
  }

  public static setUser(user1: User) {
    SavedUser.user = user1;
  }

  public static getUserInfo(): UserInfo {
    return SavedUser.userinfo;
  }

  public static setUserInfo(userinfo1: UserInfo) {
    SavedUser.userinfo = userinfo1;
  }

  public static getUserLeaveSelf(): LeaveInfo[] {
    return this.userLeaveSelf;
  }

  public static setUserLeaveSelf(_userLeaveSelf: LeaveInfo[]) {
    this.userLeaveSelf = _userLeaveSelf;
  }

  public static getUserOutSelf(): OutInfo[] {
    return this.userOutSelf;
  }

  public static setUserOutSelf(_userOutSelf: OutInfo[]) {
    this.userOutSelf = _userOutSelf;
  }

  public static getUserPunchSelf(): PunchInfo[] {
    return this.userPunchSelf;
  }

  public static setUserPunchSelf(_userPunchSelf: PunchInfo[]) {
    this.userPunchSelf = _userPunchSelf;
  }

  public static getLeaveRecord(): LeaveRecord[] {
    return this.leaveRecord;
  }

  public static setLeaveRecord(_leaveRecord: LeaveRecord[]) {
    this.leaveRecord = _leaveRecord;
  }

  public static getOutRecord(): OutRecord[] {
    return this.outRecord;
  }

  public static setOutRecord(_outRecord: OutRecord[]) {
    this.outRecord = _outRecord;
  }

  public static getPunchRecord(): PunchRecord[] {
    return this.punchRecord;
  }

  public static setPunchRecord(_punchRecord: PunchRecord[]) {
    this.punchRecord = _punchRecord;
  }
}
