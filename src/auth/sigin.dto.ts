import { IsEmail, IsNotEmpty } from 'class-validator';

// const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;
// @Matches(passwordRegEx, { message: 'Password deve conter no mínimo...' })

export class SignInDTO {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  // @Matches(passwordRegEx, { message: 'Password deve conter no mínimo...' })
  password: string;
}
