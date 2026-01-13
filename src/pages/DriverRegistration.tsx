import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const DriverRegistration = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    carBrand: '',
    carModel: '',
    carYear: '',
    carColor: '',
    licensePlate: '',
    driverLicense: '',
    bankCard: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!formData.fullName || !formData.phone || !formData.email) {
        toast.error('Заполните все поля');
        return;
      }
    } else if (step === 2) {
      if (!formData.carBrand || !formData.carModel || !formData.carYear || !formData.carColor || !formData.licensePlate) {
        toast.error('Заполните все поля');
        return;
      }
    }
    
    if (step < 3) {
      setStep(step + 1);
      toast.success('Шаг пройден');
    }
  };

  const handleSubmit = () => {
    if (!formData.driverLicense || !formData.bankCard) {
      toast.error('Заполните все поля');
      return;
    }
    toast.success('Заявка отправлена! Ожидайте проверки документов');
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <header className="mb-8 animate-fade-in">
          <Button variant="ghost" onClick={() => navigate('/')} className="mb-4">
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-heading font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Стать водителем TaxiGo
              </h1>
              <p className="text-muted-foreground mt-1">Зарабатывайте по своему графику</p>
            </div>
            <Badge variant="outline" className="text-lg px-4 py-2">
              Шаг {step} из 3
            </Badge>
          </div>
        </header>

        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center flex-1">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-heading font-bold text-lg transition-all ${
                  step >= num 
                    ? 'bg-gradient-to-br from-primary to-secondary text-white' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {num}
                </div>
                {num < 3 && (
                  <div className={`h-1 flex-1 mx-2 transition-colors ${
                    step > num ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span className={step >= 1 ? 'text-primary font-semibold' : 'text-muted-foreground'}>Личные данные</span>
            <span className={step >= 2 ? 'text-primary font-semibold' : 'text-muted-foreground'}>Автомобиль</span>
            <span className={step >= 3 ? 'text-primary font-semibold' : 'text-muted-foreground'}>Документы</span>
          </div>
        </div>

        <Card className="border-primary/20 shadow-lg shadow-primary/5 animate-scale-in">
          <CardHeader>
            <CardTitle className="text-2xl font-heading">
              {step === 1 && 'Личные данные'}
              {step === 2 && 'Информация об автомобиле'}
              {step === 3 && 'Документы и оплата'}
            </CardTitle>
            <CardDescription>
              {step === 1 && 'Введите ваши контактные данные'}
              {step === 2 && 'Укажите данные вашего автомобиля'}
              {step === 3 && 'Последний шаг - документы и реквизиты'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 1 && (
              <div className="space-y-4 animate-fade-in">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="flex items-center gap-2">
                    <Icon name="User" size={16} className="text-primary" />
                    ФИО полностью
                  </Label>
                  <Input 
                    id="fullName"
                    placeholder="Иванов Иван Иванович" 
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Icon name="Phone" size={16} className="text-primary" />
                    Номер телефона
                  </Label>
                  <Input 
                    id="phone"
                    type="tel"
                    placeholder="+7 (999) 123-45-67" 
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Icon name="Mail" size={16} className="text-primary" />
                    Email
                  </Label>
                  <Input 
                    id="email"
                    type="email"
                    placeholder="your@email.com" 
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="h-12"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 animate-fade-in">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="carBrand" className="flex items-center gap-2">
                      <Icon name="Car" size={16} className="text-primary" />
                      Марка
                    </Label>
                    <Input 
                      id="carBrand"
                      placeholder="Toyota" 
                      value={formData.carBrand}
                      onChange={(e) => handleInputChange('carBrand', e.target.value)}
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="carModel">Модель</Label>
                    <Input 
                      id="carModel"
                      placeholder="Camry" 
                      value={formData.carModel}
                      onChange={(e) => handleInputChange('carModel', e.target.value)}
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="carYear">Год выпуска</Label>
                    <Input 
                      id="carYear"
                      type="number"
                      placeholder="2020" 
                      value={formData.carYear}
                      onChange={(e) => handleInputChange('carYear', e.target.value)}
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="carColor">Цвет</Label>
                    <Input 
                      id="carColor"
                      placeholder="Черный" 
                      value={formData.carColor}
                      onChange={(e) => handleInputChange('carColor', e.target.value)}
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="licensePlate" className="flex items-center gap-2">
                    <Icon name="Hash" size={16} className="text-primary" />
                    Государственный номер
                  </Label>
                  <Input 
                    id="licensePlate"
                    placeholder="А777АА 777" 
                    value={formData.licensePlate}
                    onChange={(e) => handleInputChange('licensePlate', e.target.value)}
                    className="h-12"
                  />
                </div>

                <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
                  <div className="flex items-start gap-3">
                    <Icon name="Info" size={20} className="text-secondary mt-1" />
                    <div className="text-sm">
                      <p className="font-semibold mb-1">Требования к автомобилю:</p>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>Год выпуска не старше 2010</li>
                        <li>Исправное техническое состояние</li>
                        <li>Чистый салон и кузов</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 animate-fade-in">
                <div className="space-y-2">
                  <Label htmlFor="driverLicense" className="flex items-center gap-2">
                    <Icon name="CreditCard" size={16} className="text-primary" />
                    Водительское удостоверение
                  </Label>
                  <Input 
                    id="driverLicense"
                    placeholder="7777 123456" 
                    value={formData.driverLicense}
                    onChange={(e) => handleInputChange('driverLicense', e.target.value)}
                    className="h-12"
                  />
                </div>

                <Separator className="my-6" />

                <div className="space-y-2">
                  <Label htmlFor="bankCard" className="flex items-center gap-2">
                    <Icon name="Wallet" size={16} className="text-accent" />
                    Номер банковской карты для получения выплат
                  </Label>
                  <Input 
                    id="bankCard"
                    placeholder="1234 5678 9012 3456" 
                    value={formData.bankCard}
                    onChange={(e) => handleInputChange('bankCard', e.target.value)}
                    className="h-12"
                  />
                  <p className="text-xs text-muted-foreground">Деньги будут поступать на эту карту</p>
                </div>

                <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                  <div className="flex items-start gap-3">
                    <Icon name="DollarSign" size={20} className="text-accent mt-1" />
                    <div className="text-sm">
                      <p className="font-semibold mb-1">Условия работы:</p>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>Комиссия сервиса: 15% от заказа</li>
                        <li>Выплаты ежедневно на карту</li>
                        <li>Свободный график работы</li>
                        <li>Поддержка водителей 24/7</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-8">
              {step > 1 && (
                <Button 
                  variant="outline" 
                  onClick={() => setStep(step - 1)}
                  className="flex-1"
                >
                  <Icon name="ArrowLeft" size={20} className="mr-2" />
                  Назад
                </Button>
              )}
              <Button 
                size="lg"
                onClick={step === 3 ? handleSubmit : handleNextStep}
                className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              >
                {step === 3 ? 'Отправить заявку' : 'Далее'}
                {step < 3 && <Icon name="ArrowRight" size={20} className="ml-2" />}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 grid grid-cols-3 gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <Card className="border-primary/20">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Icon name="TrendingUp" size={24} className="text-primary" />
              </div>
              <p className="text-2xl font-heading font-bold text-primary">до 5000₽</p>
              <p className="text-sm text-muted-foreground">в день</p>
            </CardContent>
          </Card>

          <Card className="border-secondary/20">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-3">
                <Icon name="Users" size={24} className="text-secondary" />
              </div>
              <p className="text-2xl font-heading font-bold text-secondary">2000+</p>
              <p className="text-sm text-muted-foreground">водителей</p>
            </CardContent>
          </Card>

          <Card className="border-accent/20">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
                <Icon name="Clock" size={24} className="text-accent" />
              </div>
              <p className="text-2xl font-heading font-bold text-accent">24/7</p>
              <p className="text-sm text-muted-foreground">поддержка</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DriverRegistration;
