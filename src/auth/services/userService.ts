import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  nickname: string;
  createdAt: Date;
}

export interface RegisterUserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  nickname?: string;
}

// 임시로 메모리에 사용자 정보를 저장 (실제로는 데이터베이스를 사용해야 함)
const users: User[] = [];

class UserService {
  async register(userData: RegisterUserData) {
    try {
      // 필수 필드 검증
      if (!userData.email || !userData.password || !userData.firstName || !userData.lastName) {
        throw new Error('필수 필드가 누락되었습니다.');
      }

      // 이메일 형식 검증
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userData.email)) {
        throw new Error('올바른 이메일 형식이 아닙니다.');
      }

      // 이메일 중복 체크
      if (users.some(user => user.email === userData.email)) {
        throw new Error('이미 존재하는 이메일입니다.');
      }

      // 비밀번호 해싱
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);

      // 타임스탬프와 랜덤 텍스트를 조합한 고유 ID 생성
      const timestamp = Date.now().toString(36);
      const randomText = uuidv4().split('-')[0];
      const userId = `${timestamp}-${randomText}`;

      const newUser: User = {
        id: userId,
        email: userData.email,
        password: hashedPassword,
        firstName: userData.firstName,
        lastName: userData.lastName,
        nickname: userData.nickname || '',
        createdAt: new Date()
      };

      users.push(newUser);
      
      // 비밀번호를 제외한 사용자 정보 반환
      const { password, ...userWithoutPassword } = newUser;
      return userWithoutPassword;
    } catch (error) {
      console.error('회원가입 처리 중 오류 발생:', error);
      throw error;
    }
  }

  async login(email: string, password: string) {
    try {
      const user = users.find(u => u.email === email);
      if (!user) {
        throw new Error('사용자를 찾을 수 없습니다.');
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new Error('비밀번호가 일치하지 않습니다.');
      }

      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      console.error('로그인 처리 중 오류 발생:', error);
      throw error;
    }
  }
}

export const userService = new UserService();
