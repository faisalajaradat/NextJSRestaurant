export default function calculateAverage(...numbers: number[]): number {
    if (numbers.length === 0) {
      throw new Error("No numbers provided");
    }
    
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
  }
  