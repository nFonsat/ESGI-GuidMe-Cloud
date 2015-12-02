module.exports = {
	adress: "95.85.51.133",
	port: "80",
	api: {
		base_url: "/api/v1"
	},
    database: {
        uri: 'mongodb://localhost:27017/GuidMeESGI',
        secret: 'hackaton&guidMe?Mobilite:ESGI;'
    },
    clients: [
        {
            clientName: 'iOS',
            clientId: 'guid_me_ios',
            clientSecret: 'fraf_uzEch@g5Guh'
        },
        {
            clientName: 'Cloud',
            clientId: 'guid_me_cloud',
            clientSecret: 'zuVEswafrac25&Ha'
        },
        {
            clientName: 'Test',
            clientId: 'guid_me_test',
            clientSecret: '&&enaDecu266ruw@'
        }
    ]
}