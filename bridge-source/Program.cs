using System;
using System.IO;
using System.Diagnostics;

namespace ConsoleApplication8
{
    class Program
    {
        static void Main(string[] args)
        {
            string chromeMessage = OpenStandardStreamIn();
            Process.Start ("AirPinShellCmd.exe","iptv1 "+chromeMessage);
        }

        private static string OpenStandardStreamIn()
        {
            //// We need to read first 4 bytes for length information  
            Stream stdin = Console.OpenStandardInput();
            int length = 0;
            byte[] bytes = new byte[4];
            stdin.Read(bytes, 0, 4);
            length = System.BitConverter.ToInt32(bytes, 0);
            string input = "";
            for (int i = 0; i < length; i++)
            {
                input += (char)stdin.ReadByte();
            }
            return input;
        }
    }
}