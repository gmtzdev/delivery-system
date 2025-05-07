export interface TokenSummary {
    accessToken: string
    refreshToken: string
}
  
export type RefreshTokenDTO = Pick<TokenSummary, 'refreshToken'>