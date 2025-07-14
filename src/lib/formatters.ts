/**
 * 데이터를 GB/MB 단위로 포맷한다
 * @param value - GB 기준 숫자 (예: 0.5, 2 등)
 * @returns "500MB" 또는 "2GB"
 */
export function formatDataSize(value: number): string {
    return value < 1 ? `${Math.round(value * 1000)}MB` : `${value}GB`;
  }
  