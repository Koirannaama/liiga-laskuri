const TEAM_COLORS: { [ teamName: string ]: string } = {
    'lukko': '#357BCF',
    'tappara': '#450AA4',
    'ilves': '#016632',
    'pelicans': '#3fc0f0',
    'kalpa': '#C8A213',
    'kärpät': '#f5c425',
    'tps': '#50535C',
    'hifk': '#082868',
    'hpk': '#cf7a25',
    'kookoo': '#e16d25',
    'ässät': '#000000',
    'sport': '#da0612',
    'jyp': '#AB1933',
    'saipa': '#f7e900',
    'jukurit': '#00477b'

} as const;

function getTeamColor(teamName: string): string {
    return TEAM_COLORS[ teamName.toLowerCase() ];
}

export default getTeamColor;
