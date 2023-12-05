import { Numbers as NumbersType } from "@/lib/zod/numbers";

interface NumbersProps {
    numbers: NumbersType[];
}

const Numbers = ({ numbers }: NumbersProps) => {
    return (
        <div className="space-x-16 p-16 flex my-6 bg-finnishwinter justify-center">
            {numbers &&
                numbers
                    .map((number) => (
                        <div key={number.id} className="flex flex-col">
                            <div>
                                <h1 className="text-lg font-bold text-primary-600">{number.field_number.processed}</h1>
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