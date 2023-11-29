export class CoolMath {
  public static mean(values: number[]): number {
    const summation = values.reduce((acc, current) => acc + current, 0);

    return summation / values.length;
  }

  public static standardDeviation(values: number[], population = false) {
    const mean = this.mean(values);
    const n = population ? values.length - 1 : values.length;

    return Math.sqrt(
      values
        .map((x) => Math.pow(x - mean, 2))
        .reduce((acc, current) => acc + current) / n
    );
  }
}
