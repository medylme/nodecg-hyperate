export interface HrData {
  id: string;
  hr: number;
}

export interface HrReplicant {
  [id: string]: HrData | undefined;
}
