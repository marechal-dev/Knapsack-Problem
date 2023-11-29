export class CoolMath {
  public static mean(values: number[]): number {
    let summation = 0;

    for (let i = 0; i < values.length; i++) {
      summation += values[i];
    }

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
