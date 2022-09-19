/* HVIS DU REDIGERE DENNE SIDE SÅ KOMMER DU IKKE TIL FÅ OPDATERING BESKEDER!! */

export default function UpdateVersions(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({
      status: 200,
      data: [
        {
          id: "127",
          version: "1.2.7",
          date: "18/09/2022",
          commit: "PatchNotes",
          commitMsg: "Vigtigt: gå til /tags og create indexes i firebase via console",
          status: "nyeste",
        },
        {
          id: "126",
          version: "1.2.6",
          date: "16/09/2022",
          commit: "PatchNotes",
          commitMsg: "Final patch noter testing",
          status: "forældet",
        },
        {
          id: "125",
          version: "1.2.5",
          date: "16/09/2022",
          commit: "PatchNotes",
          commitMsg: "Indstillinger tilføjet",
          status: "forældet",
        },
        {
          id: "124",
          version: "1.2.4",
          date: "16/09/2022",
          commit: "PatchNotes",
          commitMsg: "Testing patch noter",
          status: "forældet",
        },
      ],
    });
  }
}
