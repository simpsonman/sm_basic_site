import { nanoid } from 'nanoid';

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
  private users: User[] = [];

  // 회원 번호 생성 함수
  private generateUserId(): string {
    const timestamp = Date.now().toString(36); // 타임스탬프를 36진수로 변환
    const randomStr = nanoid(8); // 8자리 랜덤 문자열 생성
    return `${timestamp}-${randomStr}`;
  }

  // 임시 비밀번호 해시 함수 (실제 서비스에서는 서버에서 처리해야 함)
  private async hashPassword(password: string): Promise<string> {
    // 실제 서비스에서는 이 부분을 서버에서 처리해야 합니다.
    // 임시로 base64 인코딩을 사용합니다.
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // 임시 비밀번호 검증 함수 (실제 서비스에서는 서버에서 처리해야 함)
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
    // 이메일 중복 검사
    if (this.users.some(user => user.email === userData.email)) {
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

    // 사용자 저장
    this.users.push(newUser);
    
    // 비밀번호를 제외한 사용자 정보 반환
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  // 로그인
  async login(email: string, password: string): Promise<Omit<User, 'password'>> {
    const user = this.users.find(u => u.email === email);
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
  }

  // 사용자 조회
  async getUserById(id: string): Promise<Omit<User, 'password'> | null> {
    const user = this.users.find(u => u.id === id);
    if (!user) return null;

    // 비밀번호를 제외한 사용자 정보 반환
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

export const userService = new UserService();
