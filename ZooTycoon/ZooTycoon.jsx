import { useState, useEffect } from "react";
import { Button, Card, CardContent } from "@/components/ui/card";

export default function ZooTycoonGame() {
  const animals = [
    { name: "Lion", cost: 100, income: 5, img: "/images/lion.png" },
    { name: "Elephant", cost: 250, income: 12, img: "/images/elephant.png" },
    { name: "Giraffe", cost: 500, income: 25, img: "/images/giraffe.png" },
    { name: "Zebra", cost: 150, income: 7, img: "/images/zebra.png" },
    { name: "Penguin", cost: 300, income: 15, img: "/images/penguin.png" },
  ];

  const [money, setMoney] = useState(500);
  const [zoo, setZoo] = useState(
    animals.map((a) => ({ ...a, count: 0 }))
  );

  // Calculate total income per second
  const totalIncome = zoo.reduce((sum, a) => sum + a.count * a.income, 0);

  // Passive income system
  useEffect(() => {
    const interval = setInterval(() => {
      setMoney((m) => m + totalIncome);
    }, 1000);
    return () => clearInterval(interval);
  }, [totalIncome]);

  const buyAnimal = (index) => {
    const selected = zoo[index];
    if (money >= selected.cost) {
      setMoney((m) => m - selected.cost);
      setZoo((z) =>
        z.map((a, i) =>
          i === index ? { ...a, count: a.count + 1 } : a
        )
      );
    }
  };

  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">🦁 Zoo Tycoon</h1>
      <p className="text-xl mb-2">💰 Money: ${money}</p>
      <p className="text-md mb-6">Income per second: ${totalIncome}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {zoo.map((a, i) => (
          <Card key={a.name} className="p-4 text-center shadow-lg">
            <CardContent>
              <img
                src={a.img}
                alt={a.name}
                className="w-24 h-24 mx-auto mb-2 rounded-full object-cover"
              />
              <h2 className="text-xl font-semibold">{a.name}</h2>
              <p>Count: {a.count}</p>
              <p>Income: ${a.income}/s each</p>
              <p>Cost: ${a.cost}</p>
              <Button
                className="mt-2 w-full"
                onClick={() => buyAnimal(i)}
                disabled={money < a.cost}
              >
                Buy {a.name}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}