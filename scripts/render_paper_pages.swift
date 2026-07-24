// Renders every page of public/RAG_Research.pdf to public/paper/page-N.jpg
// Run: swift scripts/render_paper_pages.swift
import Foundation
import PDFKit
import AppKit

let pdfPath = "public/RAG_Research.pdf"
let outDir = "public/paper"
let targetWidth: CGFloat = 1000

guard let doc = PDFDocument(url: URL(fileURLWithPath: pdfPath)) else {
    fatalError("Could not open \(pdfPath)")
}
try? FileManager.default.createDirectory(atPath: outDir, withIntermediateDirectories: true)

for i in 0..<doc.pageCount {
    guard let page = doc.page(at: i) else { continue }
    let bounds = page.bounds(for: .mediaBox)
    let scale = targetWidth / bounds.width
    let size = CGSize(width: bounds.width * scale, height: bounds.height * scale)

    let image = NSImage(size: size)
    image.lockFocus()
    NSColor.white.setFill()
    NSRect(origin: .zero, size: size).fill()
    let ctx = NSGraphicsContext.current!.cgContext
    ctx.saveGState()
    ctx.scaleBy(x: scale, y: scale)
    page.draw(with: .mediaBox, to: ctx)
    ctx.restoreGState()
    image.unlockFocus()

    guard let tiff = image.tiffRepresentation,
          let rep = NSBitmapImageRep(data: tiff),
          let jpg = rep.representation(using: .jpeg, properties: [.compressionFactor: 0.42]) else { continue }
    let out = "\(outDir)/page-\(i + 1).jpg"
    try! jpg.write(to: URL(fileURLWithPath: out))
    print("wrote \(out)")
}
print("done: \(doc.pageCount) pages")
