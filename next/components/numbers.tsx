import { useState, useEffect } from 'react';
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
                    const targetValue = (number.field_num);
                    const currentValue = prevCounters[index] || 0;
                    const step = Math.ceil((targetValue - currentValue) / 10);
                    return currentValue + step;
                })
            );
        }, 70);
        return () => clearInterval(interval);
    }, [numbers]);

    return (
        <div className="space-x-16 p-16 flex my-6 bg-finnishwinter justify-center">
            {numbers &&
                numbers.map((number, index) => (
                    <div key={number.id} className="flex flex-col">
                        <div>
                            <h1 className="text-lg font-bold text-primary-600">{counters[index]}{" "}{number.field_suffix}</h1>
                        </div>
                        <div>
                            <h1 className="text-secondary-900 text-xs">{number.field_text.processed}</h1>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default Numbers;


