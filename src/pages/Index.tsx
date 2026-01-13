import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const Index = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [showOrder, setShowOrder] = useState(false);

  const taxis = [
    { id: 1, name: 'Алексей М.', rating: 4.9, distance: '0.8 км', time: '2 мин', car: 'Toyota Camry', color: 'Черный', number: 'А777АА', x: 30, y: 40 },
    { id: 2, name: 'Михаил К.', rating: 5.0, distance: '1.2 км', time: '4 мин', car: 'Hyundai Solaris', color: 'Белый', number: 'В123ВВ', x: 60, y: 30 },
    { id: 3, name: 'Дмитрий П.', rating: 4.8, distance: '1.5 км', time: '5 мин', car: 'Kia Rio', color: 'Серебристый', number: 'С555СС', x: 45, y: 60 },
    { id: 4, name: 'Андрей С.', rating: 4.9, distance: '0.5 км', time: '1 мин', car: 'Skoda Octavia', color: 'Синий', number: 'Е999ЕЕ', x: 70, y: 50 },
  ];

  const paymentMethods = [
    { id: 'card', name: 'Банковская карта', icon: 'CreditCard' },
    { id: 'cash', name: 'Наличные', icon: 'Banknote' },
    { id: 'wallet', name: 'Электронный кошелек', icon: 'Wallet' },
    { id: 'apple', name: 'Apple Pay', icon: 'Smartphone' },
  ];

  const calculatePrice = () => {
    return (Math.random() * 300 + 150).toFixed(0);
  };

  const handleOrderTaxi = () => {
    if (!from || !to) {
      toast.error('Укажите адреса отправления и назначения');
      return;
    }
    if (!selectedPayment) {
      toast.error('Выберите способ оплаты');
      return;
    }
    setShowOrder(true);
    toast.success('Ищем ближайшее такси...');
    setTimeout(() => {
      toast.success('Водитель найден! Прибудет через 2 минуты');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <header className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-heading font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                TaxiGo
              </h1>
              <p className="text-muted-foreground mt-1">Быстро и безопасно</p>
            </div>
            <Button variant="outline" size="icon" className="rounded-full">
              <Icon name="User" size={20} />
            </Button>
          </div>
        </header>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-6 animate-slide-up">
            <Card className="border-primary/20 shadow-lg shadow-primary/5">
              <CardContent className="p-6">
                <h2 className="text-2xl font-heading font-bold mb-6">Заказать такси</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                      <Icon name="MapPin" size={16} className="text-primary" />
                      Откуда
                    </label>
                    <Input 
                      placeholder="Адрес отправления" 
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                      <Icon name="Flag" size={16} className="text-secondary" />
                      Куда
                    </label>
                    <Input 
                      placeholder="Адрес назначения" 
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      className="h-12"
                    />
                  </div>

                  {from && to && (
                    <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 animate-scale-in">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Примерная стоимость</p>
                          <p className="text-3xl font-heading font-bold text-primary">{calculatePrice()} ₽</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Время в пути</p>
                          <p className="text-xl font-semibold">~12 мин</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <Separator className="my-6" />

                  <div>
                    <label className="text-sm font-medium mb-3 block flex items-center gap-2">
                      <Icon name="Wallet" size={16} className="text-accent" />
                      Способ оплаты
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {paymentMethods.map((method) => (
                        <button
                          key={method.id}
                          onClick={() => setSelectedPayment(method.id)}
                          className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                            selectedPayment === method.id
                              ? 'border-primary bg-primary/10'
                              : 'border-border bg-card hover:border-primary/50'
                          }`}
                        >
                          <Icon name={method.icon as any} size={24} className="mx-auto mb-2" />
                          <p className="text-xs font-medium text-center">{method.name}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button 
                    size="lg" 
                    className="w-full h-14 text-lg font-heading bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                    onClick={handleOrderTaxi}
                  >
                    <Icon name="Car" size={24} className="mr-2" />
                    Заказать такси
                  </Button>
                </div>
              </CardContent>
            </Card>

            {showOrder && (
              <Card className="border-secondary/20 shadow-lg shadow-secondary/5 animate-scale-in">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-pulse-soft">
                      <Icon name="Car" size={24} />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-lg">Алексей М.</h3>
                      <div className="flex items-center gap-2">
                        <Icon name="Star" size={14} className="text-accent fill-accent" />
                        <span className="text-sm font-semibold">4.9</span>
                      </div>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="text-2xl font-heading font-bold text-primary">2 мин</p>
                      <p className="text-xs text-muted-foreground">до прибытия</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Автомобиль</span>
                      <span className="font-semibold">Toyota Camry (Черный)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Номер</span>
                      <Badge variant="outline">А777АА</Badge>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-6">
                    <Button variant="outline" className="flex-1">
                      <Icon name="Phone" size={18} className="mr-2" />
                      Позвонить
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Icon name="MessageSquare" size={18} className="mr-2" />
                      Написать
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Card className="border-primary/20 shadow-lg shadow-primary/5 overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-[600px] bg-gradient-to-br from-muted/50 to-primary/10">
                  <div className="absolute inset-0 opacity-20" 
                    style={{
                      backgroundImage: `
                        repeating-linear-gradient(0deg, transparent, transparent 50px, hsl(var(--border)) 50px, hsl(var(--border)) 51px),
                        repeating-linear-gradient(90deg, transparent, transparent 50px, hsl(var(--border)) 50px, hsl(var(--border)) 51px)
                      `
                    }}
                  />
                  
                  <div className="absolute top-4 left-4 z-10">
                    <Badge className="bg-background/90 backdrop-blur">
                      <Icon name="MapPin" size={14} className="mr-1" />
                      Доступно такси: {taxis.length}
                    </Badge>
                  </div>

                  {taxis.map((taxi, index) => (
                    <div
                      key={taxi.id}
                      className="absolute cursor-pointer group animate-fade-in"
                      style={{
                        left: `${taxi.x}%`,
                        top: `${taxi.y}%`,
                        animationDelay: `${index * 0.15}s`
                      }}
                    >
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg animate-pulse-soft border-4 border-background">
                          <Icon name="Car" size={20} />
                        </div>
                        
                        <div className="absolute left-16 top-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          <Card className="w-48 border-primary/20 shadow-xl">
                            <CardContent className="p-3">
                              <div className="flex items-center gap-2 mb-2">
                                <Icon name="User" size={16} className="text-primary" />
                                <span className="font-semibold text-sm">{taxi.name}</span>
                              </div>
                              <div className="space-y-1 text-xs">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Рейтинг</span>
                                  <div className="flex items-center gap-1">
                                    <Icon name="Star" size={12} className="text-accent fill-accent" />
                                    <span className="font-semibold">{taxi.rating}</span>
                                  </div>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Расстояние</span>
                                  <span className="font-semibold">{taxi.distance}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Прибудет через</span>
                                  <span className="font-semibold text-primary">{taxi.time}</span>
                                </div>
                                <Separator className="my-2" />
                                <div className="text-muted-foreground">
                                  {taxi.car} ({taxi.color})
                                </div>
                                <Badge variant="outline" className="text-xs">{taxi.number}</Badge>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>
                  ))}

                  {from && (
                    <div className="absolute left-[20%] bottom-[30%] animate-scale-in">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg border-4 border-background">
                        <Icon name="MapPin" size={16} />
                      </div>
                    </div>
                  )}

                  {to && (
                    <div className="absolute right-[25%] top-[25%] animate-scale-in" style={{ animationDelay: '0.2s' }}>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center shadow-lg border-4 border-background">
                        <Icon name="Flag" size={16} />
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 bg-card/50 backdrop-blur border-t">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary animate-pulse-soft" />
                      <span className="text-muted-foreground">Карта обновляется в реальном времени</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Icon name="Maximize2" size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <footer className="mt-12 text-center text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center justify-center gap-6 mb-4">
            <Button variant="ghost" size="sm" className="gap-2">
              <Icon name="MessageSquare" size={16} />
              Поддержка
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <Icon name="HelpCircle" size={16} />
              Помощь
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <Icon name="Shield" size={16} />
              Безопасность
            </Button>
          </div>
          <p>© 2026 TaxiGo. Современный сервис такси</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
