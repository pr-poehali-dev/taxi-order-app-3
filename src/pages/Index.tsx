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
                <div className="relative h-[600px] bg-[#2d3436] overflow-hidden">
                  <div 
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(45, 52, 54, 0.85), rgba(45, 52, 54, 0.85)),
                        repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(99, 110, 114, 0.3) 40px, rgba(99, 110, 114, 0.3) 41px),
                        repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(99, 110, 114, 0.3) 40px, rgba(99, 110, 114, 0.3) 41px)
                      `,
                      backgroundColor: '#34495e'
                    }}
                  >
                    <div className="absolute inset-0 opacity-40"
                      style={{
                        backgroundImage: `
                          radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
                          radial-gradient(circle at 80% 70%, rgba(14, 165, 233, 0.15) 0%, transparent 50%)
                        `
                      }}
                    />
                    
                    <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.4 }}>
                      <path d="M 10,100 Q 150,50 300,100 T 590,100" stroke="rgba(249, 115, 22, 0.4)" strokeWidth="3" fill="none" />
                      <path d="M 50,200 L 180,200 L 180,150 L 250,150 L 250,300" stroke="rgba(99, 110, 114, 0.5)" strokeWidth="2" fill="none" />
                      <path d="M 350,250 L 450,250 L 450,180 L 520,180" stroke="rgba(99, 110, 114, 0.5)" strokeWidth="2" fill="none" />
                      <path d="M 100,400 L 200,400 L 200,480 L 350,480" stroke="rgba(99, 110, 114, 0.5)" strokeWidth="2" fill="none" />
                      <path d="M 400,350 Q 450,370 480,350 T 560,350" stroke="rgba(99, 110, 114, 0.5)" strokeWidth="2" fill="none" />
                      
                      <text x="140" y="110" fill="rgba(255, 255, 255, 0.3)" fontSize="10" fontWeight="600">Ленина ул.</text>
                      <text x="280" y="165" fill="rgba(255, 255, 255, 0.3)" fontSize="10" fontWeight="600">Пушкина ул.</text>
                      <text x="380" y="270" fill="rgba(255, 255, 255, 0.3)" fontSize="10" fontWeight="600">Гагарина пр.</text>
                      <text x="220" y="425" fill="rgba(255, 255, 255, 0.3)" fontSize="10" fontWeight="600">Мира ул.</text>
                      
                      <rect x="160" y="160" width="15" height="15" fill="rgba(52, 152, 219, 0.3)" stroke="rgba(52, 152, 219, 0.6)" strokeWidth="1" />
                      <rect x="420" y="360" width="20" height="20" fill="rgba(46, 204, 113, 0.3)" stroke="rgba(46, 204, 113, 0.6)" strokeWidth="1" />
                      <rect x="110" y="410" width="12" height="12" fill="rgba(155, 89, 182, 0.3)" stroke="rgba(155, 89, 182, 0.6)" strokeWidth="1" />
                    </svg>
                    
                    <div className="absolute top-[15%] right-[25%] w-20 h-16 bg-green-500/20 border border-green-500/40 rounded" title="Парк" />
                    <div className="absolute bottom-[20%] left-[15%] w-24 h-24 bg-blue-500/15 border border-blue-500/30 rounded-full" title="Площадь" />
                  </div>
                  
                  <div className="absolute top-4 left-4 z-20">
                    <Badge className="bg-background/90 backdrop-blur">
                      <Icon name="MapPin" size={14} className="mr-1" />
                      Доступно такси: {taxis.length}
                    </Badge>
                  </div>
                  
                  <div className="absolute top-4 right-4 z-20 flex gap-2">
                    <Badge variant="outline" className="bg-background/90 backdrop-blur border-secondary/50">
                      <Icon name="Satellite" size={14} className="mr-1 text-secondary" />
                      Гибридный вид
                    </Badge>
                  </div>

                  {taxis.map((taxi, index) => (
                    <div
                      key={taxi.id}
                      className="absolute cursor-pointer group animate-fade-in z-10"
                      style={{
                        left: `${taxi.x}%`,
                        top: `${taxi.y}%`,
                        animationDelay: `${index * 0.15}s`
                      }}
                    >
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-2xl animate-pulse-soft border-4 border-background">
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
                    <div className="absolute left-[20%] bottom-[30%] animate-scale-in z-10">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-2xl border-4 border-background">
                        <Icon name="MapPin" size={18} />
                      </div>
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                        <Badge variant="outline" className="bg-background/95 text-xs">Откуда</Badge>
                      </div>
                    </div>
                  )}

                  {to && (
                    <div className="absolute right-[25%] top-[25%] animate-scale-in z-10" style={{ animationDelay: '0.2s' }}>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center shadow-2xl border-4 border-background">
                        <Icon name="Flag" size={18} />
                      </div>
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                        <Badge variant="outline" className="bg-background/95 text-xs">Куда</Badge>
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