const { test, expect } = require('@playwright/test');

const imageUrl = 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png';
const videoUrl = 'https://youtu.be/qYwlqx-JLok';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#m')).toBeVisible();
});

test('muestra una imagen enviada desde el navegador', async ({ page }) => {
  await page.locator('#m').fill(imageUrl);
  await page.getByRole('button', { name: 'Send' }).click();

  const image = page.locator('#messages img');
  await expect(image).toHaveAttribute('src', imageUrl);
  await expect(image).toBeVisible();
});

test('muestra un reproductor para un video de YouTube', async ({ page }) => {
  await page.locator('#m').fill(videoUrl);
  await page.getByRole('button', { name: 'Send' }).click();

  const player = page.locator('#messages iframe');
  await expect(player).toHaveAttribute('src', 'https://www.youtube.com/embed/qYwlqx-JLok');
  await expect(player).toBeVisible();
});

test('no ejecuta un script enviado al chat', async ({ page }) => {
  let dialogOpened = false;
  page.on('dialog', async dialog => {
    dialogOpened = true;
    await dialog.dismiss();
  });

  const script = "<script>alert('xss')</script>";
  await page.locator('#m').fill(script);
  await page.getByRole('button', { name: 'Send' }).click();

  await expect(page.locator('#messages')).toContainText(script);
  expect(dialogOpened).toBe(false);
  await expect(page.locator('#messages script')).toHaveCount(0);
});
