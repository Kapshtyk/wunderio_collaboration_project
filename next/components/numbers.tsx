import { useEffect, useState } from "react";

import { Numbers as NumbersType } from "@/lib/zod/numbers";

interface NumbersProps {
  numbers: NumbersType[];
}

const Numbers = ({ numbers }: NumbersProps) => {
  const [counters, setCounters] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounters((prevCounters) =>
        numbers.map((number, index) => {
          const targetValue = number.field_num;
          const currentValue = prevCounters[index] || 0;
          const step = Math.ceil((targetValue - currentValue) / 10);
          return currentValue + step;
        }),
      );
    }, 70);
    return () => clearInterval(interval);
  }, [numbers]);

  return (
    <div className="flex flex-col p-16 my-12 lg:flex-row bg-primary-50">
      {numbers &&
        numbers.map((number, index) => (
          <div
            key={number.id}
            className="w-full m-4 border-b-8 border-primary-400 shadow-lg p-6 bg-white"
          >
            <div>
              <h1 className="text-heading-md font-bold text-primary-400">
                {counters[index]} {number.field_suffix}
              </h1>
            </div>
            <div>
              <h1 className="text-secondary-900 text-md">
                {number.field_text.processed}
              </h1>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Numbers;
