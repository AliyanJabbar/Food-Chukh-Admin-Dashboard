import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs/server';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex justify-center items-start md:items-center p-8">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Welcome to Food Chukh Admin Dashboard
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <LoginLink>
            <Button className="w-full">Sign in with Kinde</Button>
          </LoginLink>
        </CardFooter>
      </Card>
    </div>
  );
}
