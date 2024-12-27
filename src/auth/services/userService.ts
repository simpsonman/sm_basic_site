import { nanoid } from 'nanoid';
import axios from 'axios';

interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  nickname?: string;
  createdAt: string;
}

class UserService {
  private baseURL = 'http://localhost:3000';

  // 회원 번호 생성 함수
  private generateUserId(): string {
    const timestamp = Date.now().toString(36);
    const randomStr = nanoid(8);
    return `${timestamp}-${randomStr}`;
  }

  // 비밀번호 해시 함수
  private async hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // 비밀번호 검증 함수
  private async verifyPassword(password: string, hash: string): Promise<boolean> {
    const hashedInput = await this.hashPassword(password);
    return hashedInput === hash;
  }

  // 회원가입
  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    nickname?: string;
  }): Promise<Omit<User, 'password'>> {
    try {
      // 이메일 중복 검사
      const response = await axios.get(`${this.baseURL}/users`);
      const users: User[] = response.data;
      
      if (users.some(user => user.email === userData.email)) {
        throw new Error('이미 등록된 이메일입니다.');
      }

      // 비밀번호 해시화
      const hashedPassword = await this.hashPassword(userData.password);

      // 새 사용자 생성
      const newUser: User = {
        id: this.generateUserId(),
        email: userData.email,
        password: hashedPassword,
        firstName: userData.firstName,
        lastName: userData.lastName,
        nickname: userData.nickname,
        createdAt: new Date().toISOString()
      };

      // db.json에 사용자 저장
      await axios.post(`${this.baseURL}/users`, newUser);
      
      // 비밀번호를 제외한 사용자 정보 반환
      const { password, ...userWithoutPassword } = newUser;
      return userWithoutPassword;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data || '서버 오류가 발생했습니다.');
      }
      throw error;
    }
  }

  // 로그인
  async login(email: string, password: string): Promise<Omit<User, 'password'>> {
    try {
      const response = await axios.get(`${this.baseURL}/users`);
      const users: User[] = response.data;
      
      const user = users.find(u => u.email === email);
      if (!user) {
        throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
      }

      const isValidPassword = await this.verifyPassword(password, user.password);
      if (!isValidPassword) {
        throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
      }

      // 비밀번호를 제외한 사용자 정보 반환
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data || '서버 오류가 발생했습니다.');
      }
      throw error;
    }
  }

  // 사용자 조회
  async getUserById(id: string): Promise<Omit<User, 'password'> | null> {
    try {
      const response = await axios.get(`${this.baseURL}/users/${id}`);
      const user: User = response.data;
      
      if (!user) return null;

      // 비밀번호를 제외한 사용자 정보 반환
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  }
}

export const userService = new UserService();
