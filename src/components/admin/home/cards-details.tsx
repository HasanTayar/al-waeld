import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Mail, Users } from 'lucide-react';


const CardsDetails = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
      {/* Email subscribers card */}
      <Card className='flex flex-col items-center p-4'>
        <CardHeader className="flex items-center space-x-2">
          <Mail className="text-blue-500" />
          <p>ספירת מנויים למייל</p>
        </CardHeader>
        <CardContent>
          <Badge>20</Badge>
        </CardContent>
      </Card>

      {/* Arabic users card */}
      <Card className='flex flex-col items-center p-4'>
        <CardHeader className="flex items-center space-x-2">
          <Users className="text-green-500" />
          <p>משתמשים ערבים</p>
        </CardHeader>
        <CardContent>
          <Badge>35</Badge>
        </CardContent>
      </Card>

      {/* Hebrew users card */}
      <Card className='flex flex-col items-center p-4'>
        <CardHeader className="flex items-center space-x-2">
          <Users className="text-red-500" />
          <p>משתמשים עבריים</p>
        </CardHeader>
        <CardContent>
          <Badge>50</Badge>
        </CardContent>
      </Card>
    </div>
  )
}

export default CardsDetails;
