export const categoryTotals = (expenses) => {
    const map={};

    expenses.forEach((exp)=>{
        map[exp.category] = (map[exp.category] || 0) + exp.amount;
    })

    return Object.keys(map).map((key) => ({
        category:key,
        amount:map[key]
    }));
};