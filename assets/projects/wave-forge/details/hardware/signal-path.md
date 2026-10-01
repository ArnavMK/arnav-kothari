# Signal Path

This image explains the high-level signal path of the system so far. It only includes boards that are necessary for audio production.

![Wave Forge signal path — Mae, Shori, Shoyu and the F12-X200 speaker](assets\\projects\\wave-forge\\signal_pathh.png)

**Gamen** (UI board) connects to **Shori** through a JST connector and cable assembly, and talks over a high-baud-rate UART protocol. It transfers all the information about the tone parameters the user has set or is actively changing.

**Gen** is the power supply which powers the whole amp. It's not included in the image above since it's technically not producing sound, but without it the amp would not work.

See **Board Descriptions** in Introduction for what each board does, or the **Boards** folder for detail on a specific one.

# Control Flow


This section explains how the flow of control is laid out. By that i mean what happens when the user changes something on the UI or the using the hardware knobs.

![Control-flow image](assets\\projects\\wave-forge\\control_flow.png)

The presets information will be stored on gamen, so whenever the footswitch pedal is used or the screen is used, a full preset packet will be sent to shori over UART to apply those saved parameters. However the IR cab files will have to be stored on shori but there references can be stored on gamen. Shori’s MCU will need to access the IR files at all times, and its much faster to store it in flash memory rather than having to transfer it over UART.