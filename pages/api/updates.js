/* HVIS DU REDIGERE DENNE SIDE SÅ KOMMER DU IKKE TIL FÅ OPDATERING BESKEDER!! */

export default function handler(req, res) {
    if(req.method === 'GET') {
      return res.status(200).json(
        {
          "status": 200,
          "data": [
            {
              "id": "122",
              "date": "16/09/2022",
              "name": "Harok",
            },
            {
              "id": "121",
              "date": "16/09/2022",
              "name": "Hatana",
            },
            {
              "id": "120",
              "date": "16/09/2022",
              "name": "Ziggly",
            }
          ]
        }
      );
    }
  }