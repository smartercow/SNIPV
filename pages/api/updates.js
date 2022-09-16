/* HVIS DU REDIGERE DENNE SIDE SÅ KOMMER DU IKKE TIL FÅ OPDATERING BESKEDER!! */

export default function handler(req, res) {
    res.status(200).json({
      "data": [
        {
          "id": "122",
          "date": "16/09/2022",
          "version": "1.2.2",
          "commit": "PatchNotes",
          "commitMsg": "Der blevet skiftet noget3",
          "status": "nuværende"
        },
        {
          "id": "121",
          "date": "16/09/2022",
          "version": "1.2.2",
          "commit": "PatchNotes",
          "commitMsg": "Der blevet skiftet noget3",
          "status": "nuværende"
        },
        {
          "id": "120",
          "date": "16/09/2022",
          "version": "1.2.2",
          "commit": "PatchNotes",
          "commitMsg": "Der blevet skiftet noget3",
          "status": "nuværende"
        }
      ]
    })
  }