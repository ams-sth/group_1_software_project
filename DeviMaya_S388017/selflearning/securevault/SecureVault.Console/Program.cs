// Lesson 1A
// Console.WriteLine("=== SecureVault ===");

// string website = "Example";
// string username = "student@example.com";
// int strengthScore = 75;
// bool isFavourite = true;
// DateTime createdAt = DateTime.Now;

// Console.WriteLine($"Website: {website}");
// Console.WriteLine($"Username: {username}");
// Console.WriteLine($"Strength: {strengthScore}");
// Console.WriteLine($"Favourite: {isFavourite}");
// Console.WriteLine($"Created: {createdAt}");

// Lesson 1B
// Console.Write("Enter the website name: ");
// string? website = Console.ReadLine();

// Console.Write("Enter a numeric ID: ");
// string? idText = Console.ReadLine();

// if (int.TryParse(idText, out int id))
// {
//     Console.WriteLine($"You entered ID {id} for {website}.");
// }
// else
// {
//     Console.WriteLine("The ID must be a whole number.");
// }

// Lesson 1C
// Console.Write("Enter password length: ");
// int.TryParse(Console.ReadLine(), out int length);

// if (length < 8)
// {
//     Console.WriteLine("Weak");
// }
// else if (length < 12)
// {
//     Console.WriteLine("Reasonable");
// }
// else
// {
//     Console.WriteLine("Long password");
// }

// string label = length switch
// {
//     < 8 => "Weak",
//     < 12 => "Reasonable",
//     _ => "Long"
// };

// Lesson 1D
string[] websites = { "Netflix", "GitHub", "Microsoft" };

for (int i = 0; i < websites.Length; i++)
{
    Console.WriteLine($"{i + 1}. {websites[i]}");
}

foreach (string website in websites)
{
    Console.WriteLine(website);
}

bool running = true;
while (running)
{
    Console.Write("Type exit to stop: ");
    string? command = Console.ReadLine();
    running = command != "exit";
}


